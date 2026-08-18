#!/usr/bin/env python3
"""Validador de contrato do GATE 1 — NÃO é runtime.

Valida envelopes JSON de exemplo contra gateway-envelope-v0.1.schema.json
usando draft/2020-12 com referência cruzada ao event-types-v0.1.json.
Saída: 0 = sem erros de schema; cada violação é reportada com caminho.
"""
import json
import sys
import jsonschema
from jsonschema import RefResolver
from pathlib import Path

HERE = Path(__file__).parent
envelope_schema = json.load(open(HERE / "gateway-envelope-v0.1.schema.json"))
event_types = json.load(open(HERE / "event-types-v0.1.json"))

event_types_defs = {
    "$id": "event-types-v0.1.json",
    "event_type": event_types["event_type"],
    "properties": event_types["properties"],
}

store = {"event-types-v0.1.json": event_types_defs}
resolver = RefResolver(
    base_uri="event-types-v0.1.json#", referrer=event_types_defs, store=store,
)

errors = 0
for path in sys.argv[1:]:
    doc = json.load(open(path))
    validator = jsonschema.Draft202012Validator(envelope_schema, resolver=resolver)
    count = 0
    for err in sorted(validator.iter_errors(doc), key=lambda e: list(e.absolute_path)):
        count += 1
        pathstr = ".".join(str(p) for p in err.absolute_path) or "(root)"
        print(f"{path}: {pathstr}: {err.message}")
    errors += count
    print(f"{path}: {count} erro(s) de schema")

print(f"TOTAL: {errors} erro(s)")
sys.exit(1 if errors else 0)
