import json
import subprocess
import tempfile
import unittest
from pathlib import Path

import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from context_gate import evaluate, normalize_repository  # noqa: E402


class ContextGateTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.repo = Path(self.temp.name) / "repo"
        self.repo.mkdir()
        subprocess.run(["git", "init", "-b", "main"], cwd=self.repo, check=True, capture_output=True)
        subprocess.run(["git", "config", "user.email", "gate@example.invalid"], cwd=self.repo, check=True)
        subprocess.run(["git", "config", "user.name", "Context Gate"], cwd=self.repo, check=True)
        subprocess.run(
            ["git", "remote", "add", "origin", "https://github.com/owner/demo.git"],
            cwd=self.repo,
            check=True,
        )
        (self.repo / "RULE.md").write_text("rule\n", encoding="utf-8")
        subprocess.run(["git", "add", "RULE.md"], cwd=self.repo, check=True)
        subprocess.run(["git", "commit", "-m", "baseline"], cwd=self.repo, check=True, capture_output=True)
        self.commit = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=self.repo, text=True).strip()
        self.index = Path(self.temp.name) / "context-gate" / "projects"
        self.index.mkdir(parents=True)
        self.project_file = self.index / "demo.json"
        self.write_project()

    def tearDown(self):
        self.temp.cleanup()

    def write_project(self, **changes):
        project = {
            "id": "demo", "name": "Demo", "repository": "owner/demo", "expected_branch": "main",
            "checkpoint": {"id": "cp-1", "path": "RULE.md", "commit": self.commit, "status": "ACTIVE"},
            "canonical_rules": [{"id": "rule", "path": "RULE.md"}], "authority": ["Git"],
            "source_of_truth": {"code": "Git"}, "pending": ["review"],
            "prohibited_actions": ["force push"], "stop_condition": "validated",
            "required_evidence": ["tests"],
        }
        project.update(changes)
        self.project_file.write_text(json.dumps(project), encoding="utf-8")

    def mission(self, **changes):
        value = {
            "project": "demo", "objective": "test", "checkpoint": "cp-1", "rules": ["rule"],
            "constraints": ["minimal"], "source_of_truth": {"code": "Git"},
            "allowed_actions": ["read"], "prohibited_actions": ["publish"],
            "validation": ["tests"], "stop_condition": "done", "requires_clean_worktree": True,
        }
        value.update(changes)
        path = Path(self.temp.name) / "mission.json"
        path.write_text(json.dumps(value), encoding="utf-8")
        return path

    def test_healthy_context_passes(self):
        self.assertEqual(evaluate(self.project_file, self.repo, self.mission())["status"], "PASS")

    def test_stale_checkpoint_blocks(self):
        subprocess.run(["git", "checkout", "--orphan", "other"], cwd=self.repo, check=True, capture_output=True)
        subprocess.run(["git", "rm", "-rf", "."], cwd=self.repo, check=True, capture_output=True)
        (self.repo / "RULE.md").write_text("other\n", encoding="utf-8")
        subprocess.run(["git", "add", "RULE.md"], cwd=self.repo, check=True)
        subprocess.run(["git", "commit", "-m", "other"], cwd=self.repo, check=True, capture_output=True)
        self.assertEqual(evaluate(self.project_file, self.repo)["status"], "BLOCKED")

    def test_missing_mission_field_is_detected(self):
        result = evaluate(self.project_file, self.repo, self.mission(stop_condition=""))
        self.assertEqual(result["status"], "BLOCKED")
        self.assertIn("stop_condition", result["errors"][0])

    def test_dirty_tree_blocks_clean_mission(self):
        (self.repo / "dirty.txt").write_text("dirty\n", encoding="utf-8")
        result = evaluate(self.project_file, self.repo, self.mission())
        self.assertEqual(result["status"], "BLOCKED")
        self.assertIn("clean working tree", result["errors"][-1])

    def test_missing_rule_path_is_detected(self):
        self.write_project(canonical_rules=[{"id": "missing", "path": "MISSING.md"}])
        self.assertEqual(evaluate(self.project_file, self.repo)["status"], "BLOCKED")

    def test_wrong_repository_is_blocked(self):
        subprocess.run(
            ["git", "remote", "set-url", "origin", "https://github.com/owner/other.git"],
            cwd=self.repo,
            check=True,
        )
        result = evaluate(self.project_file, self.repo)
        self.assertEqual(result["status"], "BLOCKED")
        self.assertTrue(any("remote does not match" in error for error in result["errors"]))

    def test_equivalent_github_ssh_remote_is_accepted(self):
        subprocess.run(
            ["git", "remote", "set-url", "origin", "ssh://git@github.com/owner/demo.git"],
            cwd=self.repo,
            check=True,
        )
        self.assertEqual(evaluate(self.project_file, self.repo)["status"], "PASS")
        self.assertEqual(normalize_repository("git@github.com:OWNER/demo.git"), "owner/demo")

    def test_rule_must_exist_in_declared_scope(self):
        (Path(self.temp.name) / "INDEX_ONLY.md").write_text("index\n", encoding="utf-8")
        self.write_project(
            canonical_rules=[{"id": "rule", "path": "INDEX_ONLY.md", "scope": "repo"}]
        )
        self.assertEqual(evaluate(self.project_file, self.repo)["status"], "BLOCKED")

    def test_unavailable_checkpoint_commit_is_blocked(self):
        self.write_project(
            checkpoint={
                "id": "cp-1",
                "path": "RULE.md",
                "commit": "0" * 40,
                "status": "ACTIVE",
            }
        )
        result = evaluate(self.project_file, self.repo)
        self.assertEqual(result["status"], "BLOCKED")
        self.assertTrue(any("commit unavailable" in error for error in result["errors"]))

    def test_checkpoint_metadata_mismatch_is_blocked(self):
        checkpoint_path = Path(self.temp.name) / "checkpoint.json"
        checkpoint_path.write_text(
            json.dumps(
                {"id": "other", "project": "demo", "status": "ACTIVE", "commit": self.commit}
            ),
            encoding="utf-8",
        )
        self.write_project(
            checkpoint={
                "id": "cp-1",
                "path": "checkpoint.json",
                "commit": self.commit,
                "status": "ACTIVE",
            }
        )
        result = evaluate(self.project_file, self.repo)
        self.assertEqual(result["status"], "BLOCKED")
        self.assertTrue(any("checkpoint id" in error for error in result["errors"]))

    def test_project_prohibited_action_blocks_mission_allowlist(self):
        result = evaluate(
            self.project_file,
            self.repo,
            self.mission(allowed_actions=["read", "force push"]),
        )
        self.assertEqual(result["status"], "BLOCKED")
        self.assertTrue(
            any("project prohibited_actions" in error and "force push" in error for error in result["errors"])
        )

    def test_mission_cannot_both_allow_and_prohibit_same_action(self):
        result = evaluate(
            self.project_file,
            self.repo,
            self.mission(allowed_actions=["read", "publish"], prohibited_actions=["publish"]),
        )
        self.assertEqual(result["status"], "BLOCKED")
        self.assertTrue(
            any("mission prohibited_actions" in error and "publish" in error for error in result["errors"])
        )

    def test_opera_vision_checkpoint_captures_required_release_context(self):
        project = json.loads(
            (ROOT / "context-gate/projects/opera-vision.json").read_text(encoding="utf-8")
        )
        checkpoint = json.loads(
            (
                ROOT
                / "context-gate/checkpoints/opera-vision-release-2026-08-13.json"
            ).read_text(encoding="utf-8")
        )
        joined = "\n".join(checkpoint["facts"] + project["pending"] + project["prohibited_actions"])
        for expected in (
            "Vision Items V0 está em RELEASE GREEN",
            "PWA Nível 1 está em RELEASE GREEN",
            "RLS multiusuário",
            "PWA Nível 2",
            "Publish é decisão do owner",
        ):
            self.assertIn(expected, joined)


if __name__ == "__main__":
    unittest.main()
