import json
import unittest
from collections import Counter
from pathlib import Path

from scripts.archive_pdf_pipeline import ArbiterParameters, ReadingOrderEngine, TextBlock
from scripts.archive_pdf_to_markdown import LayoutLine, render_layout


DATASET = Path(__file__).parent / "fixtures" / "reading_order_arbiter_v05.json"


def load_fixtures():
    return json.loads(DATASET.read_text(encoding="utf-8"))["fixtures"]


def blocks(fixture):
    transform=tuple(fixture.get("transform",[1,0,0,1,0,0]))
    return [TextBlock(block_id,1,block_id,(x,y,x+40,y+10),11,transform,index)
            for index,(block_id,x,y) in enumerate(fixture["blocks"])]


class AdversarialArbiterTests(unittest.TestCase):
    def test_all_ground_truth_fixtures(self):
        for fixture in load_fixtures():
            with self.subTest(fixture=fixture["id"]):
                engine=ReadingOrderEngine(); ordered=engine.order(blocks(fixture)); decision=engine.decisions[0]
                self.assertEqual(decision.decision.value,fixture["expected_decision"])
                self.assertEqual([item.block.block_id for item in ordered],fixture["expected_order"])
                self.assertTrue(fixture["justification"]); self.assertTrue(fixture["signals"])

    def test_confusion_matrix_is_diagonal(self):
        matrix=Counter()
        for fixture in load_fixtures():
            engine=ReadingOrderEngine(); engine.order(blocks(fixture))
            matrix[(fixture["expected_decision"],engine.decisions[0].decision.value)]+=1
        self.assertEqual(matrix,{("KEEP_SOURCE_ORDER","KEEP_SOURCE_ORDER"):6,
                                 ("USE_GEOMETRY_ORDER","USE_GEOMETRY_ORDER"):2,
                                 ("ORDER_UNCERTAIN","ORDER_UNCERTAIN"):5})

    def test_determinism_is_total(self):
        for fixture in load_fixtures():
            outcomes=[]
            for _ in range(5):
                engine=ReadingOrderEngine(); ordered=engine.order(blocks(fixture))
                outcomes.append((engine.decisions[0],[item.block.block_id for item in ordered]))
            self.assertTrue(all(outcome==outcomes[0] for outcome in outcomes))

    def test_thresholds_are_explicit_and_versioned(self):
        parameters=ArbiterParameters()
        self.assertEqual(parameters.version,"0.5.0")
        self.assertEqual(parameters.coordinate_tolerance,2.0)
        self.assertEqual(parameters.column_gap_min,80.0)
        self.assertEqual(parameters.column_gap_width_ratio,1.5)
        self.assertEqual(parameters.max_overlap_ratio,0.10)
        self.assertEqual(parameters.min_quality_improvement,0.50)
        self.assertEqual(parameters.max_geometry_violation_ratio,0.0)
        self.assertEqual(parameters.min_source_vertical_violation_ratio,0.50)
        self.assertEqual(parameters.min_anomalous_jump_ratio,1.25)
        self.assertEqual(parameters.max_indentation_span,24.0)
        self.assertEqual(parameters.min_blocks_per_column,2)

    def test_metrics_expose_cost_confidence_and_gates(self):
        fixture=next(item for item in load_fixtures() if item["id"]=="B_source_clearly_wrong")
        engine=ReadingOrderEngine(); engine.order(blocks(fixture)); metrics=engine.decisions[0].metrics
        self.assertEqual(metrics["reordering_cost"],metrics["conflict_ratio"])
        self.assertEqual(metrics["geometry_confidence"],1.0)
        self.assertEqual(metrics["evidence_gates_passed"],metrics["evidence_gates_total"])

    def test_threshold_boundaries_change_only_the_intended_gate(self):
        fixture=next(item for item in load_fixtures() if item["id"]=="B_source_clearly_wrong")
        conservative=ReadingOrderEngine(ArbiterParameters(min_quality_improvement=0.51))
        conservative.order(blocks(fixture)); self.assertEqual(conservative.decisions[0].decision.value,"ORDER_UNCERTAIN")
        calibrated=ReadingOrderEngine(ArbiterParameters(min_quality_improvement=0.50))
        calibrated.order(blocks(fixture)); self.assertEqual(calibrated.decisions[0].decision.value,"USE_GEOMETRY_ORDER")
        overlap=next(item for item in load_fixtures() if item["id"]=="H_overlap")
        strict=ReadingOrderEngine(); strict.order(blocks(overlap)); self.assertEqual(strict.decisions[0].decision.value,"ORDER_UNCERTAIN")
        permissive=ReadingOrderEngine(ArbiterParameters(max_overlap_ratio=1.0))
        permissive.order(blocks(overlap)); self.assertEqual(permissive.decisions[0].decision.value,"KEEP_SOURCE_ORDER")

    def test_all_decisions_emit_their_warning(self):
        cases=[([LayoutLine("a0",0,100,11,300),LayoutLine("a1",0,80,11,300)],"READING_ORDER_SOURCE_PRESERVED"),
               ([LayoutLine("b0",0,60,11,300),LayoutLine("b1",0,100,11,300),LayoutLine("b2",0,80,11,300)],"READING_ORDER_GEOMETRY_SELECTED"),
               ([LayoutLine("h0",0,100,11,300),LayoutLine("h1",5,100,11,300),LayoutLine("h2",10,100,11,300)],"READING_ORDER_UNCERTAIN")]
        for lines,warning in cases:
            with self.subTest(warning=warning): self.assertIn(warning,render_layout([lines])[1]["warnings"])


if __name__=="__main__": unittest.main()
