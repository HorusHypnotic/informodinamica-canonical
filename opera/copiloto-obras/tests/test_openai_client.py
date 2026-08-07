import hashlib
import json
from types import SimpleNamespace
from unittest.mock import patch

import pytest

from copiloto_obras.config import RuntimeConfig
from copiloto_obras.composition import calculate_manifest_sha256
from copiloto_obras.models import Capability, CompositionManifest, CompositionResult, ModuleRecord, Permission
from copiloto_obras.openai_client import OpenAIClient
from copiloto_obras.session import create_session, switch_interlocutor


def composition():
    content = b"instrucao canonica"
    record = ModuleRecord(path="canonical.md", sha256=hashlib.sha256(content).hexdigest(), snapshot_bytes=content)
    return CompositionManifest(result=CompositionResult.VALIDA, modules=[record], manifest_sha256=calculate_manifest_sha256("copiloto_obras.v0.1", [record]))


def payload(actor_id, *, extra=False, incomplete=False):
    value = {
        "composition_result": "VALIDA",
        "session_state": {"previous": "CONTATO", "current": "DESCOBERTA"},
        "interlocutor_id": actor_id,
        "information": [],
        "evidence_gaps": [],
        "contradictions": [],
        "recommendations": [],
        "handoff": None,
        "unavailable_capabilities": [],
        "response_plan": {"intent": "INFORMATION_INCOMPLETE"},
    }
    if extra:
        value["free_text"] = "não autorizado"
    if incomplete:
        value.pop("response_plan")
    return value


class FakeResponses:
    def __init__(self, output):
        self.output = output
        self.calls = []

    def create(self, **kwargs):
        self.calls.append(kwargs)
        return SimpleNamespace(output_text=self.output)


def configured_client(output, calls):
    responses = FakeResponses(output)
    calls["responses"] = responses
    config = RuntimeConfig(openai_api_key="fixture-key", openai_model="fixture-model", timeout_seconds=1, max_retries=0, log_level="INFO")
    return OpenAIClient(config, client_factory=lambda: SimpleNamespace(responses=responses))


def authorized(context):
    clean_context = context.model_copy(update={"unavailable_capabilities": context.unavailable_capabilities - {Capability.OPENAI_API_CALL}})
    session = switch_interlocutor(create_session(clean_context, composition()), clean_context, "mariana-lopes")
    return clean_context, session


def test_external_call_occurs_only_after_authorization(context):
    calls = {"factory": 0}
    config = RuntimeConfig(openai_api_key="fixture-key", openai_model="fixture-model", timeout_seconds=1, max_retries=0, log_level="INFO")

    def factory():
        calls["factory"] += 1
        return SimpleNamespace(responses=FakeResponses("{}"))

    client = OpenAIClient(config, client_factory=factory)
    session = create_session(context, composition())
    with pytest.raises(ValueError, match="Interlocutor atual"):
        client.respond(context=context, session=session, composition=composition(), requested_action=Permission.VIEW_PRODUCTION, current_interlocutor_id="mariana-lopes", user_input="status")
    assert calls["factory"] == 0


def test_valid_raw_json_is_schema_validated_and_rendered(context):
    context, session = authorized(context)
    calls = {}
    client = configured_client(json.dumps(payload("mariana-lopes")), calls)
    from copiloto_obras.renderer import render
    with patch("copiloto_obras.response_validation.render", wraps=render) as renderer:
        output = client.respond(context=context, session=session, composition=composition(), requested_action=Permission.VIEW_PRODUCTION, current_interlocutor_id="mariana-lopes", user_input="status")
    renderer.assert_called_once()
    assert output == "Informações validadas:"
    assert calls["responses"].calls[0]["input"][0]["content"] == "instrucao canonica"


@pytest.mark.parametrize("raw", ["texto livre", "", "[]"])
def test_free_text_empty_and_non_object_responses_are_rejected(context, raw):
    context, session = authorized(context)
    client = configured_client(raw, {})
    with patch("copiloto_obras.response_validation.render") as renderer:
        with pytest.raises(ValueError):
            client.respond(context=context, session=session, composition=composition(), requested_action=Permission.VIEW_PRODUCTION, current_interlocutor_id="mariana-lopes", user_input="status")
    renderer.assert_not_called()


@pytest.mark.parametrize("change", [{"extra": True}, {"incomplete": True}])
def test_extra_and_incomplete_schema_never_reach_renderer(context, change):
    context, session = authorized(context)
    client = configured_client(json.dumps(payload("mariana-lopes", **change)), {})
    with patch("copiloto_obras.response_validation.render") as renderer:
        with pytest.raises(Exception):
            client.respond(context=context, session=session, composition=composition(), requested_action=Permission.VIEW_PRODUCTION, current_interlocutor_id="mariana-lopes", user_input="status")
    renderer.assert_not_called()


def test_dry_run_does_not_construct_external_client(context, monkeypatch):
    from copiloto_obras.cli import main
    monkeypatch.setattr("sys.argv", ["copiloto_obras", "--context", "fixtures/contexts/gh01.json", "--dry-run"])
    with patch.object(OpenAIClient, "build_client") as build_client:
        main()
    build_client.assert_not_called()
