"""Synthetic append-only event contract tests. No external IO."""
import unittest
from opportunity_event_ledger_v0 import Event, EventConflict, SyntheticLedger


def event(event_id="e1", opportunity_id="opp1", kind="HYPOTHESIS", payload=(("source", "synthetic"),)):
    return Event(event_id, opportunity_id, kind, payload)


class EventLedgerContractTests(unittest.TestCase):
    def setUp(self):
        self.ledger = SyntheticLedger()

    def test_first_append(self):
        self.assertEqual(self.ledger.append(event()), "APPENDED")
        self.assertEqual(len(self.ledger.all_events()), 1)

    def test_replay_is_idempotent(self):
        self.ledger.append(event())
        self.assertEqual(self.ledger.append(event()), "NOOP")
        self.assertEqual(len(self.ledger.all_events()), 1)

    def test_same_id_different_content_rejected(self):
        self.ledger.append(event())
        with self.assertRaises(EventConflict):
            self.ledger.append(event(payload=(("source", "changed"),)))
        self.assertEqual(self.ledger.history("opp1"), (event(),))

    def test_correction_keeps_prior_event(self):
        self.ledger.append(event())
        self.ledger.append(event("e2", kind="CORRECTION", payload=(("revision_of", "e1"),)))
        self.assertEqual([x.event_id for x in self.ledger.history("opp1")], ["e1", "e2"])

    def test_negative_outcome_preserved(self):
        self.ledger.append(event())
        self.ledger.append(event("e2", kind="OUTCOME", payload=(("result", "FAIL"),)))
        self.assertEqual(self.ledger.history("opp1")[-1].payload, (("result", "FAIL"),))

    def test_separate_opportunities(self):
        self.ledger.append(event())
        self.ledger.append(event("e2", opportunity_id="opp2"))
        self.assertEqual(len(self.ledger.history("opp1")), 1)
        self.assertEqual(len(self.ledger.history("opp2")), 1)

    def test_missing_identity_rejected(self):
        with self.assertRaises(ValueError):
            self.ledger.append(event(event_id=""))


if __name__ == "__main__":
    unittest.main()
