"""Synthetic acceptance checks for opportunity deduplication V0.

No external services, personal data, or production mutations.
Run: python3 -m unittest discover -s tests -p 'test_opportunity_dedup_v0.py'
"""
import unittest
import unicodedata
import re


def normalize(value):
    value = unicodedata.normalize("NFKD", value.casefold())
    value = "".join(c for c in value if not unicodedata.combining(c))
    return re.sub(r"\\s+", " ", value).strip()


def classify(existing, incoming):
    required = ("segment_id", "problem_key", "intervention_key")
    if any(not incoming.get(k) for k in required):
        return "UNKNOWN"
    key = tuple(normalize(incoming[k]) for k in required)
    for item in existing:
        if any(not item.get(k) for k in required):
            continue
        old = tuple(normalize(item[k]) for k in required)
        if old == key:
            return "CONTRADICT" if incoming.get("contradicts") else "REINFORCE"
    for item in existing:
        if normalize(item.get("segment_id", "")) == key[0] and normalize(item.get("problem_key", "")) == key[1]:
            return "RELATED_NEW"
    return "NEW"


class OpportunityDedupContractTests(unittest.TestCase):
    def setUp(self):
        self.a = dict(segment_id="Distribuição", problem_key="Veículo ocioso", intervention_key="Frete de terceiros")

    def test_new(self):
        self.assertEqual(classify([], self.a), "NEW")

    def test_reinforce_normalized(self):
        self.assertEqual(classify([self.a], dict(segment_id=" distribuicao ", problem_key="veiculo  ocioso", intervention_key="frete de terceiros")), "REINFORCE")

    def test_related_new(self):
        self.assertEqual(classify([self.a], {**self.a, "intervention_key": "Consolidar rotas"}), "RELATED_NEW")

    def test_new_segment(self):
        self.assertEqual(classify([self.a], {**self.a, "segment_id": "Vidraçaria"}), "NEW")

    def test_contradiction(self):
        self.assertEqual(classify([self.a], {**self.a, "contradicts": True}), "CONTRADICT")

    def test_unknown(self):
        self.assertEqual(classify([self.a], {**self.a, "segment_id": ""}), "UNKNOWN")

    def test_empty_existing_does_not_mask_missing(self):
        self.assertEqual(classify([], dict(segment_id="x")), "UNKNOWN")


if __name__ == "__main__":
    unittest.main()
