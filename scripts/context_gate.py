#!/usr/bin/env python3
"""Gera e valida um Context Preflight usando apenas a biblioteca padrão."""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

PROJECT_FIELDS = {
    "id", "name", "repository", "expected_branch", "checkpoint", "canonical_rules",
    "authority", "source_of_truth", "pending", "prohibited_actions", "stop_condition",
    "required_evidence",
}
MISSION_FIELDS = {
    "project", "objective", "checkpoint", "rules", "constraints", "source_of_truth",
    "allowed_actions", "prohibited_actions", "validation", "stop_condition",
    "requires_clean_worktree",
}
CHECKPOINT_FIELDS = {"id", "project", "status", "commit"}


def git(repo: Path, *args: str) -> tuple[int, str]:
    result = subprocess.run(
        ["git", "-C", str(repo), *args], capture_output=True, text=True, encoding="utf-8"
    )
    return result.returncode, result.stdout.strip()


def load_json(path: Path) -> dict:
    with path.open(encoding="utf-8") as source:
        return json.load(source)


def missing(data: dict, required: set[str]) -> list[str]:
    return sorted(key for key in required if key not in data or data[key] in (None, "", [], {}))


def normalize_repository(value: str) -> str:
    normalized = value.strip().removesuffix(".git").rstrip("/")
    for marker in ("github.com/", "github.com:"):
        if marker in normalized:
            return normalized.split(marker, 1)[1].lower()
    return normalized.lower()


def evaluate(project_file: Path, repo: Path, mission_file: Path | None = None) -> dict:
    project = load_json(project_file)
    errors: list[str] = []
    warnings: list[str] = []
    absent = missing(project, PROJECT_FIELDS)
    if absent:
        errors.append("project missing fields: " + ", ".join(absent))

    code, head = git(repo, "rev-parse", "HEAD")
    if code:
        errors.append("repository is not a readable Git worktree")
        head = "UNKNOWN"
    _, branch = git(repo, "branch", "--show-current")
    _, dirty = git(repo, "status", "--porcelain=v1")
    _, remote = git(repo, "config", "--get", "remote.origin.url")

    expected_repository = project.get("repository", "")
    if expected_repository and normalize_repository(remote) != expected_repository.lower():
        errors.append(f"remote does not match project repository: {remote or 'missing'}")

    if project.get("expected_branch") and branch != project["expected_branch"]:
        warnings.append(f"expected branch {project['expected_branch']}, found {branch or 'detached'}")

    checkpoint = project.get("checkpoint", {})
    checkpoint_commit = checkpoint.get("commit")
    if checkpoint_commit and head != "UNKNOWN":
        code, _ = git(repo, "cat-file", "-e", f"{checkpoint_commit}^{{commit}}")
        if code:
            errors.append(f"checkpoint commit unavailable: {checkpoint_commit}")
        else:
            code, _ = git(repo, "merge-base", "--is-ancestor", checkpoint_commit, "HEAD")
            if code:
                errors.append("checkpoint commit is not an ancestor of HEAD")

    index_root = project_file.parents[2]
    checkpoint_path = checkpoint.get("path", "")
    checkpoint_file = index_root / checkpoint_path
    if checkpoint_path and checkpoint_file.suffix == ".json" and checkpoint_file.exists():
        checkpoint_data = load_json(checkpoint_file)
        absent = missing(checkpoint_data, CHECKPOINT_FIELDS)
        if absent:
            errors.append("checkpoint missing fields: " + ", ".join(absent))
        for key in ("id", "status", "commit"):
            if checkpoint_data.get(key) != checkpoint.get(key):
                errors.append(f"checkpoint {key} does not match project index")
        if checkpoint_data.get("project") != project.get("id"):
            errors.append("checkpoint project does not match project index")

    for rule in project.get("canonical_rules", []):
        path = rule.get("path", "")
        scope = rule.get("scope", "repo")
        if scope not in {"repo", "index"}:
            errors.append(f"canonical rule has invalid scope: {rule.get('id', path)}")
            continue
        target = (repo if scope == "repo" else index_root) / path
        if not target.exists():
            errors.append(f"canonical rule path does not exist: {path}")

    mission = None
    if mission_file:
        mission = load_json(mission_file)
        absent = missing(mission, MISSION_FIELDS)
        if absent:
            errors.append("mission missing fields: " + ", ".join(absent))
        if mission.get("project") != project.get("id"):
            errors.append("mission project does not match preflight project")
        if mission.get("checkpoint") != checkpoint.get("id"):
            warnings.append("mission references a checkpoint different from the active checkpoint")
        known_rules = {rule.get("id") for rule in project.get("canonical_rules", [])}
        unknown = sorted(set(mission.get("rules", [])) - known_rules)
        if unknown:
            errors.append("mission references unknown rules: " + ", ".join(unknown))

        mission_allowed = set(mission.get("allowed_actions", []))
        project_prohibited = set(project.get("prohibited_actions", []))
        mission_prohibited = set(mission.get("prohibited_actions", []))
        project_conflicts = sorted(mission_allowed & project_prohibited)
        mission_conflicts = sorted(mission_allowed & mission_prohibited)
        if project_conflicts:
            errors.append(
                "mission allowed_actions conflict with project prohibited_actions: "
                + ", ".join(project_conflicts)
            )
        if mission_conflicts:
            errors.append(
                "mission allowed_actions conflict with mission prohibited_actions: "
                + ", ".join(mission_conflicts)
            )

        if mission.get("requires_clean_worktree") and dirty:
            errors.append("mission requires a clean working tree")
    elif dirty:
        warnings.append("working tree is dirty")

    status = "BLOCKED" if errors else "WARN" if warnings else "PASS"
    return {
        "project": project,
        "mission": mission,
        "git": {"branch": branch, "head": head, "working_tree": "DIRTY" if dirty else "CLEAN", "remote": remote},
        "status": status,
        "warnings": warnings,
        "errors": errors,
    }


def render(result: dict) -> str:
    project = result["project"]
    checkpoint = project.get("checkpoint", {})
    lines = [
        "PROJECT", project.get("name", "UNKNOWN"), "", "CURRENT STATE",
        f"branch: {result['git']['branch']}", f"HEAD: {result['git']['head']}",
        f"working tree: {result['git']['working_tree']}", f"remote: {result['git']['remote']}",
        "", "LATEST CHECKPOINT", f"{checkpoint.get('id')} | {checkpoint.get('status')} | {checkpoint.get('commit')}",
        "", "ACTIVE CANONICAL RULES",
    ]
    lines.extend(f"- {rule['id']}: {rule['path']}" for rule in project.get("canonical_rules", []))
    lines += ["", "AUTHORITY ORDER"] + [f"- {item}" for item in project.get("authority", [])]
    lines += ["", "SOURCE OF TRUTH"] + [f"- {key}: {value}" for key, value in project.get("source_of_truth", {}).items()]
    lines += ["", "KNOWN PENDING ITEMS"] + [f"- {item}" for item in project.get("pending", [])]
    lines += ["", "PROHIBITED ACTIONS"] + [f"- {item}" for item in project.get("prohibited_actions", [])]
    lines += ["", "STOP CONDITION", project.get("stop_condition", "UNKNOWN"), "", "REQUIRED EVIDENCE"]
    lines += [f"- {item}" for item in project.get("required_evidence", [])]
    if result["warnings"]:
        lines += ["", "WARNINGS"] + [f"- {item}" for item in result["warnings"]]
    if result["errors"]:
        lines += ["", "BLOCKERS"] + [f"- {item}" for item in result["errors"]]
    lines += ["", "CONTEXT STATUS", result["status"]]
    return "\n".join(lines)


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description="Canonical Context Gate")
    parser.add_argument("--project", required=True, help="project id")
    parser.add_argument("--repo", type=Path, help="target Git worktree")
    parser.add_argument("--mission", type=Path, help="mission JSON")
    parser.add_argument("--json", action="store_true", help="machine-readable output")
    args = parser.parse_args()
    project_file = root / "context-gate" / "projects" / f"{args.project}.json"
    if not project_file.exists():
        print(f"BLOCKED: unknown project {args.project}", file=sys.stderr)
        return 2
    result = evaluate(project_file, (args.repo or root).resolve(), args.mission)
    print(json.dumps(result, ensure_ascii=False, indent=2) if args.json else render(result))
    return 2 if result["status"] == "BLOCKED" else 0


if __name__ == "__main__":
    raise SystemExit(main())
