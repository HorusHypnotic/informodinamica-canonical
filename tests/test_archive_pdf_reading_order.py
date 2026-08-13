import unittest
from scripts.archive_pdf_pipeline import OrderDecision,ReadingOrderEngine,TextBlock

def b(i,x,y,order=None,transform=(1,0,0,1,0,0)): return TextBlock(str(i),1,str(i),(x,y,x+40,y+10),11,transform,i if order is None else order)
class ReadingOrderTests(unittest.TestCase):
 def setUp(self): self.engine=ReadingOrderEngine()
 def result(self,blocks):
  ordered=self.engine.order(blocks); return [x.block.text for x in ordered],self.engine.decisions[0]
 def texts(self,blocks): return self.result(blocks)[0]
 def test_one_column_preserves_plausible_source(self): self.assertEqual(self.texts([b(0,0,100),b(1,0,80)]),['0','1'])
 def test_clear_two_columns(self): self.assertEqual(self.texts([b(0,0,100),b(2,200,100),b(1,0,80),b(3,200,80)]),['0','1','2','3'])
 def test_strongly_incoherent_source_is_corrected(self): self.assertEqual(self.texts([b(0,0,60),b(1,0,100),b(2,0,80)]),['1','2','0'])
 def test_transform_translation_and_scale(self): self.assertEqual(self.texts([b(0,0,100,transform=(2,0,0,2,10,10)),b(1,0,80,transform=(2,0,0,2,10,10))]),['0','1'])
 def test_rotation_preserves_source_when_geometry_is_ambiguous(self): self.assertEqual(self.texts([b(0,0,100,transform=(0,1,-1,0,0,0)),b(1,0,80,transform=(0,1,-1,0,0,0))]),['0','1'])
 def test_overlap_preserves_source(self): self.assertEqual(self.texts([b(0,0,100),b(1,0,100)]),['0','1'])
 def test_indented_list_does_not_reorder(self): self.assertEqual(self.texts([b(0,0,100),b(1,24,80),b(2,48,60)]),['0','1','2'])
 def test_multiline_heading_does_not_reorder(self): self.assertEqual(self.texts([b(0,0,100),b(1,0,85)]),['0','1'])
 def test_source_order_correct_is_explicitly_preserved(self): self.assertEqual(self.result([b(0,0,100),b(1,0,80)])[1].decision,OrderDecision.KEEP_SOURCE_ORDER)
 def test_two_columns_geometry_wins_only_against_alternation(self):
  texts,decision=self.result([b(0,0,100),b(1,200,100),b(2,0,80),b(3,200,80)])
  self.assertEqual(texts,['0','2','1','3']); self.assertEqual(decision.decision,OrderDecision.USE_GEOMETRY_ORDER)
 def test_attractive_geometry_loses_without_combined_evidence(self):
  texts,decision=self.result([b(0,0,80),b(1,0,100),b(2,0,60),b(3,0,40)])
  self.assertEqual(texts,['0','1','2','3']); self.assertEqual(decision.decision,OrderDecision.ORDER_UNCERTAIN)
 def test_real_ambiguity_is_not_reordered(self):
  texts,decision=self.result([b(0,0,100),b(1,0,60),b(2,0,80)])
  self.assertEqual(texts,['0','1','2']); self.assertEqual(decision.decision,OrderDecision.ORDER_UNCERTAIN)
 def test_decision_and_parameters_are_deterministic(self):
  first=self.result([b(0,0,60),b(1,0,100),b(2,0,80)])[1]; second=self.result([b(0,0,60),b(1,0,100),b(2,0,80)])[1]
  self.assertEqual(first,second); self.assertEqual(first.parameters.version,'0.6.0')
if __name__=='__main__': unittest.main()
