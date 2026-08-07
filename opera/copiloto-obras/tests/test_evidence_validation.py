from dataclasses import dataclass

import pytest

from copiloto_obras.evidence_validation import validate_item_scope


@dataclass
class ScopeItem:
    company_id: str
    worksite_id: str
    period: str


def valid_item() -> ScopeItem:
    return ScopeItem("company-1", "worksite-1", "2026-07")


def test_valid_scope_returns_none():
    assert validate_item_scope(valid_item(), company_id="company-1", worksite_id="worksite-1", period="2026-07") is None


def test_missing_company_id_rejected():
    item = type("Item", (), {"worksite_id": "worksite-1", "period": "2026-07"})()
    with pytest.raises(ValueError, match="escopo: company_id ausente ou vazio"):
        validate_item_scope(item, company_id="company-1", worksite_id="worksite-1", period="2026-07")


def test_empty_worksite_id_rejected():
    with pytest.raises(ValueError, match="escopo: worksite_id ausente ou vazio"):
        validate_item_scope(ScopeItem("company-1", "", "2026-07"), company_id="company-1", worksite_id="worksite-1", period="2026-07")


def test_missing_period_rejected():
    item = type("Item", (), {"company_id": "company-1", "worksite_id": "worksite-1"})()
    with pytest.raises(ValueError, match="escopo: period ausente ou vazio"):
        validate_item_scope(item, company_id="company-1", worksite_id="worksite-1", period="2026-07")


def test_different_company_rejected():
    with pytest.raises(ValueError, match="escopo: empresa divergente"):
        validate_item_scope(ScopeItem("other", "worksite-1", "2026-07"), company_id="company-1", worksite_id="worksite-1", period="2026-07")


def test_different_worksite_rejected():
    with pytest.raises(ValueError, match="escopo: obra divergente"):
        validate_item_scope(ScopeItem("company-1", "other", "2026-07"), company_id="company-1", worksite_id="worksite-1", period="2026-07")


def test_different_period_rejected():
    with pytest.raises(ValueError, match="escopo: período divergente"):
        validate_item_scope(ScopeItem("company-1", "worksite-1", "2026-08"), company_id="company-1", worksite_id="worksite-1", period="2026-07")
