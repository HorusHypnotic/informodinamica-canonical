import unittest
from scripts.archive_pdf_pipeline import BlockKind,OrderedBlock,StructureClassifier,TextBlock
def o(i,text,y,size=11,x=0,state=None): return OrderedBlock(TextBlock(str(i),1,text,(x,y,x+100,y+10),size,source_order=i,checklist_state=state),i,'FIXTURE')
class StructureTests(unittest.TestCase):
 def setUp(self): self.c=StructureClassifier()
 def kinds(self,x): return [b.kind for b in self.c.classify(x)]
 def test_simple_heading(self): self.assertEqual(self.kinds([o(0,'Title',100,20),o(1,'A sufficiently long paragraph body.',70,11)])[0],BlockKind.HEADING)
 def test_multiline_heading_grouped(self):
  r=self.c.classify([o(0,'First title line',100,20),o(1,'second title line',82,20),o(2,'A sufficiently long paragraph body.',50,11)]); self.assertEqual(len(r[0].blocks),2)
 def test_paragraph(self): self.assertEqual(self.kinds([o(0,'A sufficiently long paragraph body.',100,11)])[0],BlockKind.PARAGRAPH)
 def test_list_and_multilevel(self): self.assertEqual(self.kinds([o(0,'- item',100),o(1,'1.1 subitem',80,x=24)]),[BlockKind.LIST_ITEM]*2)
 def test_uncertain_checklist(self): self.assertEqual(self.kinds([o(0,'item',100,state='unknown')])[0],BlockKind.CHECKLIST_ITEM)
 def test_false_heading(self): self.assertEqual(self.kinds([o(0,'Short isolated',100,11),o(1,'A sufficiently long paragraph body.',70,11)])[0],BlockKind.PARAGRAPH)
 def test_visual_sequence_is_list(self): self.assertEqual(self.kinds([o(0,'1. First',100,16),o(1,'2. Second',80,16),o(2,'3. Third',60,16),o(3,'A sufficiently long paragraph body.',30,11)])[:3],[BlockKind.LIST_ITEM]*3)
if __name__=='__main__': unittest.main()
