import unittest
from scripts.archive_pdf_pipeline import ReadingOrderEngine,TextBlock

def b(i,x,y,order=None,transform=(1,0,0,1,0,0)): return TextBlock(str(i),1,str(i),(x,y,x+40,y+10),11,transform,i if order is None else order)
class ReadingOrderTests(unittest.TestCase):
 def setUp(self): self.engine=ReadingOrderEngine()
 def texts(self,blocks): return [x.block.text for x in self.engine.order(blocks)]
 def test_one_column_preserves_plausible_source(self): self.assertEqual(self.texts([b(0,0,100),b(1,0,80)]),['0','1'])
 def test_clear_two_columns(self): self.assertEqual(self.texts([b(0,0,100),b(2,200,100),b(1,0,80),b(3,200,80)]),['0','1','2','3'])
 def test_strongly_incoherent_source_is_corrected(self): self.assertEqual(self.texts([b(0,0,60),b(1,0,100),b(2,0,80)]),['1','2','0'])
 def test_transform_translation_and_scale(self): self.assertEqual(self.texts([b(0,0,100,transform=(2,0,0,2,10,10)),b(1,0,80,transform=(2,0,0,2,10,10))]),['0','1'])
 def test_rotation_preserves_source_when_geometry_is_ambiguous(self): self.assertEqual(self.texts([b(0,0,100,transform=(0,1,-1,0,0,0)),b(1,0,80,transform=(0,1,-1,0,0,0))]),['0','1'])
 def test_overlap_preserves_source(self): self.assertEqual(self.texts([b(0,0,100),b(1,0,100)]),['0','1'])
 def test_indented_list_does_not_reorder(self): self.assertEqual(self.texts([b(0,0,100),b(1,24,80),b(2,48,60)]),['0','1','2'])
 def test_multiline_heading_does_not_reorder(self): self.assertEqual(self.texts([b(0,0,100),b(1,0,85)]),['0','1'])
if __name__=='__main__': unittest.main()
