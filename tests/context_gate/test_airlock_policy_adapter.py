from __future__ import annotations

import importlib.util
import unittest
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[2] / "scripts" / "compile_airlock_policy.py"
SPEC = importlib.util.spec_from_file_location("compile_airlock_policy", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)
compile_policy = MODULE.compile_policy


class AirlockPolicyAdapterTests(unittest.TestCase):
    def setUp(self) -> None:
        self.mission = {
            "allowed_actions": ["git.read", "git.push"],
            "prohibited_actions": ["git.force_push"],
        }
        self.action_map = {
            "git.read": ["exec/run:git status", "exec/run:git diff *"],
            "git.push": ["exec/run:git push *"],
            "git.force_push": ["exec/run:git push --force *"],
        }

    def test_authorized_compiles_allowed_actions_to_allow(self) -> None:
        result = compile_policy(self.mission, self.action_map, "AUTHORIZED")
        self.assertEqual(result["status"], "PASS")
        self.assertIn("exec/run:git push *", result["policy"]["allow"])
        self.assertIn("exec/run:git push --force *", result["policy"]["deny"])
        self.assertEqual(result["policy"]["ask"], [])

    def test_human_gate_compiles_allowed_actions_to_ask(self) -> None:
        result = compile_policy(self.mission, self.action_map, "HUMAN_GATE")
        self.assertEqual(result["status"], "PASS")
        self.assertEqual(result["policy"]["allow"], [])
        self.assertIn("exec/run:git push *", result["policy"]["ask"])
        self.assertIn("exec/run:git push --force *", result["policy"]["deny"])

    def test_not_authorized_denies_every_referenced_tool(self) -> None:
        result = compile_policy(self.mission, self.action_map, "NOT_AUTHORIZED")
        self.assertEqual(result["status"], "PASS")
        self.assertEqual(result["policy"]["allow"], [])
        self.assertEqual(result["policy"]["ask"], [])
        self.assertEqual(
            set(result["policy"]["deny"]),
            {
                "exec/run:git status",
                "exec/run:git diff *",
                "exec/run:git push *",
                "exec/run:git push --force *",
            },
        )

    def test_unmapped_allowed_action_blocks_compilation(self) -> None:
        mission = {
            "allowed_actions": ["deploy.production"],
            "prohibited_actions": [],
        }
        result = compile_policy(mission, {}, "AUTHORIZED")
        self.assertEqual(result["status"], "BLOCKED")
        self.assertIn("deploy.production", result["errors"][0])
        self.assertEqual(result["policy"], {"allow": [], "ask": [], "deny": []})

    def test_unknown_authorization_blocks_compilation(self) -> None:
        result = compile_policy(self.mission, self.action_map, "MAYBE")
        self.assertEqual(result["status"], "BLOCKED")
        self.assertTrue(any("unknown authorization" in item for item in result["errors"]))

    def test_deny_wins_when_actions_map_to_same_tool_pattern(self) -> None:
        mission = {
            "allowed_actions": ["git.push"],
            "prohibited_actions": ["dangerous.push"],
        }
        action_map = {
            "git.push": ["exec/run:git push *"],
            "dangerous.push": ["exec/run:git push *"],
        }
        result = compile_policy(mission, action_map, "AUTHORIZED")
        self.assertEqual(result["status"], "PASS")
        self.assertNotIn("exec/run:git push *", result["policy"]["allow"])
        self.assertIn("exec/run:git push *", result["policy"]["deny"])

    def test_unmapped_prohibited_action_also_blocks(self) -> None:
        mission = {
            "allowed_actions": [],
            "prohibited_actions": ["delete.production"],
        }
        result = compile_policy(mission, {}, "AUTHORIZED")
        self.assertEqual(result["status"], "BLOCKED")
        self.assertTrue(any("delete.production" in item for item in result["errors"]))


if __name__ == "__main__":
    unittest.main()
