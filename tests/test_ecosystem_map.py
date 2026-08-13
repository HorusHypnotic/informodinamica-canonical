import copy
import unittest

from scripts.validate_ecosystem_map import load, validate


class EcosystemMapTests(unittest.TestCase):
    def test_map_and_cross_references_are_valid(self):
        self.assertEqual(validate(), {"systems": 18, "capabilities": 11, "sprints": 9, "status": "PASS"})

    def test_every_classification_has_evidence(self):
        for system in load("systems.json")["systems"]:
            self.assertTrue(system["evidence"])
            self.assertTrue(system["recommendation"])

    def test_no_duplicate_ids(self):
        for file_name, key, field in (("systems.json","systems","id"),("capabilities.json","capabilities","id"),("roadmap.json","sprints","sprint_id")):
            values = [item[field] for item in load(file_name)[key]]
            self.assertEqual(len(values), len(set(values)))


if __name__ == "__main__": unittest.main()
