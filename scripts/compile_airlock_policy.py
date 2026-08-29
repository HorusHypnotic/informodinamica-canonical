#!/usr/bin/env python3
"""Compile OPERA mission actions into a fail-closed Airlock agent policy fragment.

This compiler never executes tools and never contacts Airlock. It only translates
explicit mission authority into allow/ask/deny tool-pattern lists using an explicit
action map supplied by the caller.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

AUTHORIZATION_STATES = {"AUTHORIZED", "HUMAN_GATE", "NOT_AUTHORIZED"}


def _load_json(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as source:
        data = json.load(source)
    if not isinstance(data, dict):
        raise ValueError(f"expected JSON object in {path}")
    return data


def _normalize_action_map(action_map: dict[str, Any]) -> tuple[dict[str, list[str]], list[str]]:
    normalized: dict[str, list[str]] = {}
    errors: list[str] = []
    for action, raw_patterns in action_map.items():
        if not isinstance(action, str) or not action.strip():
            errors.append("action_map contains an invalid action key")
            continue
        if not isinstance(raw_patterns, list) or not raw_patterns:
            errors.append(f"action_map entry '{action}' must be a non-empty list")
            continue
        patterns: list[str] = []
        for pattern in raw_patterns:
            if not isinstance(pattern, str) or not pattern.strip():
                errors.append(f"action_map entry '{action}' contains an invalid tool pattern")
                continue
            patterns.append(pattern.strip())
        if patterns:
            normalized[action] = sorted(set(patterns))
    return normalized, errors


def compile_policy(
    mission: dict[str, Any],
    action_map: dict[str, Any],
    authorization: str,
) -> dict[str, Any]:
    """Return PASS/BLOCKED plus an Airlock-compatible agent policy fragment."""
    errors: list[str] = []

    if authorization not in AUTHORIZATION_STATES:
        errors.append(f"unknown authorization state: {authorization}")

    allowed_raw = mission.get("allowed_actions", [])
    prohibited_raw = mission.get("prohibited_actions", [])
    if not isinstance(allowed_raw, list) or not all(isinstance(item, str) for item in allowed_raw):
        errors.append("mission allowed_actions must be a list of strings")
        allowed_actions: set[str] = set()
    else:
        allowed_actions = set(allowed_raw)
    if not isinstance(prohibited_raw, list) or not all(
        isinstance(item, str) for item in prohibited_raw
    ):
        errors.append("mission prohibited_actions must be a list of strings")
        prohibited_actions: set[str] = set()
    else:
        prohibited_actions = set(prohibited_raw)

    normalized_map, map_errors = _normalize_action_map(action_map)
    errors.extend(map_errors)

    referenced_actions = allowed_actions | prohibited_actions
    unmapped = sorted(action for action in referenced_actions if action not in normalized_map)
    if unmapped:
        errors.append("mission actions missing explicit Airlock mapping: " + ", ".join(unmapped))

    if errors:
        return {
            "status": "BLOCKED",
            "authorization": authorization,
            "policy": {"allow": [], "ask": [], "deny": []},
            "errors": errors,
        }

    allowed_tools = {
        pattern for action in allowed_actions for pattern in normalized_map.get(action, [])
    }
    prohibited_tools = {
        pattern for action in prohibited_actions for pattern in normalized_map.get(action, [])
    }

    # Deny always wins over any positive authority mapping.
    positive_tools = allowed_tools - prohibited_tools

    if authorization == "AUTHORIZED":
        allow = positive_tools
        ask: set[str] = set()
        deny = prohibited_tools
    elif authorization == "HUMAN_GATE":
        allow = set()
        ask = positive_tools
        deny = prohibited_tools
    else:  # NOT_AUTHORIZED
        allow = set()
        ask = set()
        deny = allowed_tools | prohibited_tools

    return {
        "status": "PASS",
        "authorization": authorization,
        "policy": {
            "allow": sorted(allow),
            "ask": sorted(ask),
            "deny": sorted(deny),
        },
        "errors": [],
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Compile OPERA mission actions to Airlock policy")
    parser.add_argument("--mission", type=Path, required=True)
    parser.add_argument("--action-map", type=Path, required=True)
    parser.add_argument("--authorization", required=True)
    args = parser.parse_args()

    try:
        mission = _load_json(args.mission)
        action_map = _load_json(args.action_map)
        result = compile_policy(mission, action_map, args.authorization)
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        result = {
            "status": "BLOCKED",
            "authorization": args.authorization,
            "policy": {"allow": [], "ask": [], "deny": []},
            "errors": [str(exc)],
        }

    print(json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True))
    return 0 if result["status"] == "PASS" else 2


if __name__ == "__main__":
    raise SystemExit(main())
