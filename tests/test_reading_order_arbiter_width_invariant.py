import json
import unittest
from collections import Counter
from pathlib import Path

from scripts.archive_pdf_pipeline import ReadingOrderEngine, TextBlock


DATASET=Path(__file__).parent/"fixtures"/"reading_order_arbiter_v06_width_invariant.json"


def fixtures(): return json.loads(DATASET.read_text(encoding="utf-8"))["fixtures"]


def make_blocks(fixture):
    return [TextBlock(block_id,1,block_id,(x0,y0,x1,y1),11,source_order=index,page_width=fixture["page_width"])
            for index,(block_id,x0,y0,x1,y1) in enumerate(fixture["blocks"])]


def outcome(fixture):
    engine=ReadingOrderEngine(); ordered=engine.order(make_blocks(fixture))
    return engine.decisions[0],[item.block.block_id for item in ordered]


class WidthInvariantSignalTests(unittest.TestCase):
    def test_ground_truth_and_order(self):
        for fixture in fixtures():
            with self.subTest(fixture=fixture["id"]):
                decision,order=outcome(fixture)
                self.assertEqual(decision.decision.value,fixture["expected_decision"])
                self.assertEqual(order,fixture["expected_order"])

    def test_confusion_matrix_has_no_false_geometry(self):
        matrix=Counter((f["expected_decision"],outcome(f)[0].decision.value) for f in fixtures())
        self.assertEqual(matrix,{("KEEP_SOURCE_ORDER","KEEP_SOURCE_ORDER"):3,
                                 ("USE_GEOMETRY_ORDER","USE_GEOMETRY_ORDER"):5,
                                 ("ORDER_UNCERTAIN","ORDER_UNCERTAIN"):4})

    def test_determinism_100_percent(self):
        for fixture in fixtures():
            results=[outcome(fixture) for _ in range(10)]
            self.assertTrue(all(item==results[0] for item in results))

    def test_width_and_page_scale_invariance(self):
        by_id={f["id"]:f for f in fixtures()}
        self.assertEqual(outcome(by_id["W07_scale_small"])[1],outcome(by_id["W08_scale_large"])[1])
        self.assertEqual(outcome(by_id["W09_columns_narrow_page"])[1],outcome(by_id["W10_columns_wide_page"])[1])
        same_left=outcome(by_id["W01_same_left_varied_widths"])[0].metrics
        self.assertEqual(same_left["left_edge_span_ratio"],0)

    def test_column_signal_ablation_left_edge_gap(self):
        fixture=next(f for f in fixtures() if f["id"]=="W02_real_columns_varied_widths")
        changed={**fixture,"blocks":[[i,(120 if x0==350 else x0),y0,(300 if x0==350 else x1),y1] for i,x0,y0,x1,y1 in fixture["blocks"]]}
        self.assertNotEqual(outcome(changed)[0].decision.value,"USE_GEOMETRY_ORDER")

    def test_column_signal_ablation_region_separation(self):
        fixture=next(f for f in fixtures() if f["id"]=="W02_real_columns_varied_widths")
        changed={**fixture,"blocks":[[i,x0,y0,(380 if x0==30 else x1),y1] for i,x0,y0,x1,y1 in fixture["blocks"]]}
        self.assertNotEqual(outcome(changed)[0].decision.value,"USE_GEOMETRY_ORDER")

    def test_column_signal_ablation_cluster_support(self):
        fixture=next(f for f in fixtures() if f["id"]=="W02_real_columns_varied_widths")
        changed={**fixture,"blocks":[b for b in fixture["blocks"] if b[0]!="r2"]}
        self.assertNotEqual(outcome(changed)[0].decision.value,"USE_GEOMETRY_ORDER")

    def test_vertical_signal_ablation_left_edge_alignment(self):
        fixture=next(f for f in fixtures() if f["id"]=="W07_scale_small")
        changed={**fixture,"blocks":[[i,(80 if i=="mid" else x0),y0,x1,y1] for i,x0,y0,x1,y1 in fixture["blocks"]]}
        self.assertNotEqual(outcome(changed)[0].decision.value,"USE_GEOMETRY_ORDER")


if __name__=="__main__": unittest.main()
