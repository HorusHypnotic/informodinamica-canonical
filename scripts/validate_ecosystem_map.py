#!/usr/bin/env python3
"""Validate Ecosystem Map V1 cross-references and controlled vocabularies."""

import json
from pathlib import Path

ROOT = Path(__file__).parents[1]
STATUSES = {"IDEA","CONCEPT","PROTOTYPE","TECHNICAL_GREEN","FUNCTIONAL_GREEN","RELEASE_GREEN","OPERATIONAL","MARKET_VALIDATED","REVENUE_GENERATING","FROZEN","DEPRECATED"}
LEVELS = {"NEAR","MID","FAR"}
EFFORTS = {"XS","S","M","L","XL","UNKNOWN"}
HORIZONS = {"NOW","NEXT","LATER"}


def load(name): return json.loads((ROOT / "ecosystem" / name).read_text(encoding="utf-8"))


def unique(items, label):
    ids = [item["id"] for item in items]
    if len(ids) != len(set(ids)): raise ValueError(f"duplicate {label} id")
    return set(ids)


def validate():
    systems = load("systems.json")["systems"]
    capabilities = load("capabilities.json")["capabilities"]
    sprints = load("roadmap.json")["sprints"]
    system_ids = unique(systems, "system"); capability_ids = unique(capabilities, "capability")
    sprint_ids = [x["sprint_id"] for x in sprints]
    if len(sprint_ids) != len(set(sprint_ids)): raise ValueError("duplicate sprint id")
    sprint_ids = set(sprint_ids)
    for system in systems:
        required = {"id","name","category","nature","repository","status","last_checkpoint","evidence","objective","capabilities_existing","capabilities_reused","dependencies","pending","risks","next_sprints","effort","technical_maturity","service_maturity","product_maturity","market_validation","revenue_potential","research_potential","competitive_advantage","priority","recommendation"}
        if required - set(system): raise ValueError(f"system missing fields: {system.get('id')}")
        if system["status"] not in STATUSES or not system["evidence"]: raise ValueError(f"invalid/unproven status: {system['id']}")
        if any(not (ROOT / evidence).exists() for evidence in system["evidence"]): raise ValueError(f"missing evidence source: {system['id']}")
        if system["effort"] not in EFFORTS or any(system[x] not in LEVELS for x in ("technical_maturity","service_maturity","product_maturity")): raise ValueError(f"invalid scale: {system['id']}")
        if set(system["capabilities_existing"] + system["capabilities_reused"]) - capability_ids: raise ValueError(f"unknown capability: {system['id']}")
        if set(system["next_sprints"]) - sprint_ids: raise ValueError(f"unknown sprint: {system['id']}")
        for dep in system["dependencies"]:
            if dep["system_id"] not in system_ids or dep["status"] not in {"CONFIRMED","PROPOSED","UNKNOWN"}: raise ValueError(f"invalid dependency: {system['id']}")
    for cap in capabilities:
        if not cap["canonical_source"] or set(cap["used_by"] + cap["could_reuse"]) - system_ids: raise ValueError(f"invalid capability: {cap['id']}")
        if not (ROOT / cap["canonical_source"]).exists(): raise ValueError(f"missing capability source: {cap['id']}")
    for sprint in sprints:
        if sprint["horizon"] not in HORIZONS or sprint["effort"] not in EFFORTS or not sprint["exit_criterion"]: raise ValueError(f"invalid sprint: {sprint['sprint_id']}")
        if set(sprint["systems"]) - system_ids: raise ValueError(f"unknown sprint system: {sprint['sprint_id']}")
    return {"systems":len(systems),"capabilities":len(capabilities),"sprints":len(sprints),"status":"PASS"}


if __name__ == "__main__": print(json.dumps(validate(), sort_keys=True))
