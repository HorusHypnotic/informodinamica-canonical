"""Deterministic reading-order and structure contracts for DIRECT_MD."""
from __future__ import annotations
import math,re,statistics
from dataclasses import dataclass,replace
from enum import Enum

class BlockKind(str,Enum):
    HEADING="HEADING"; PARAGRAPH="PARAGRAPH"; LIST_ITEM="LIST_ITEM"; CHECKLIST_ITEM="CHECKLIST_ITEM"; UNKNOWN="UNKNOWN"; TABLE_LIKE="TABLE_LIKE"

@dataclass(frozen=True)
class TextBlock:
    block_id:str; page:int; text:str; bbox:tuple[float,float,float,float]; font_size:float; transform:tuple[float,float,float,float,float,float]=(1,0,0,1,0,0); source_order:int=0; checklist_state:str|None=None

@dataclass(frozen=True)
class OrderedBlock:
    block:TextBlock; order:int; order_basis:str

@dataclass(frozen=True)
class ClassifiedBlock:
    blocks:tuple[OrderedBlock,...]; kind:BlockKind; level:int=0; warning:str|None=None
    @property
    def text(self): return " ".join(x.block.text for x in self.blocks)

def visual_bbox(block:TextBlock):
    a,b,c,d,e,f=block.transform; x0,y0,x1,y1=block.bbox
    points=[(a*x+c*y+e,b*x+d*y+f) for x,y in ((x0,y0),(x0,y1),(x1,y0),(x1,y1))]
    return min(x for x,_ in points),min(y for _,y in points),max(x for x,_ in points),max(y for _,y in points)

class ReadingOrderEngine:
    """Order blocks only; never assigns semantic or Markdown structure."""
    def order(self,blocks:list[TextBlock])->list[OrderedBlock]:
        result=[]
        for page in sorted({x.page for x in blocks}):
            source=sorted((x for x in blocks if x.page==page),key=lambda x:x.source_order)
            if len(source)<2: chosen,basis=source,"SOURCE_ORDER"
            else:
                boxes=[visual_bbox(x) for x in source]; centers=[(b[0]+b[2])/2 for b in boxes]; span=max(centers)-min(centers)
                split=(max(centers)+min(centers))/2; left=[x for x,c in zip(source,centers) if c<split]; right=[x for x,c in zip(source,centers) if c>=split]
                clear_columns=(len(left)>=2 and len(right)>=2 and span>max(80,max(b[2] for b in boxes)*.30))
                if clear_columns:
                    chosen=sorted(left,key=lambda x:-visual_bbox(x)[3])+sorted(right,key=lambda x:-visual_bbox(x)[3]); basis="CLEAR_COLUMNS"
                else:
                    ys=[(b[1]+b[3])/2 for b in boxes]; plausible=sum(ys[i]>=ys[i+1]-2 for i in range(len(ys)-1))/max(1,len(ys)-1)
                    nonoverlap=all(boxes[i][1]>=boxes[i+1][3]-2 or boxes[i+1][1]>=boxes[i][3]-2 for i in range(len(boxes)-1))
                    aligned=max(b[0] for b in boxes)-min(b[0] for b in boxes)<=24
                    if plausible<=.50 and nonoverlap and aligned: chosen=sorted(source,key=lambda x:-visual_bbox(x)[3]); basis="STRONG_VERTICAL_EVIDENCE"
                    else: chosen,basis=source,"SOURCE_ORDER"
            result.extend(OrderedBlock(x,len(result),basis) for x in chosen)
        return result

LIST=re.compile(r"^(?:[-*•▪◦]|\.|\d+(?:\.\d+)*[.)]?|[A-Za-z][.)])\s+.+$")
CHECK=re.compile(r"^(?:□|☐|☑|✓|\[\s?\]|\[[xX]\])\s*.+$")
NUMBERED=re.compile(r"^\d+(?:\.\d+)*\.?\s+")

class StructureClassifier:
    """Classify already ordered blocks; it cannot change their order."""
    def classify(self,ordered:list[OrderedBlock])->list[ClassifiedBlock]:
        sizes=[x.block.font_size for x in ordered if x.block.font_size>0 and len(x.block.text)>20]; body=statistics.median(sizes) if sizes else 0
        preliminary=[]
        for item in ordered:
            block=item.block; ratio=block.font_size/body if body and block.font_size else 0
            plain_numbered_heading=bool(NUMBERED.match(block.text) and not body and re.search(r"\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ]",block.text))
            if block.checklist_state or CHECK.match(block.text): kind=BlockKind.CHECKLIST_ITEM
            elif plain_numbered_heading: kind=BlockKind.HEADING
            elif LIST.match(block.text): kind=BlockKind.LIST_ITEM
            elif len(block.text)<=140 and ratio>=1.18: kind=BlockKind.HEADING
            elif len(block.text)<=120 and NUMBERED.match(block.text) and (not body or ratio>=1.05): kind=BlockKind.HEADING
            else: kind=BlockKind.PARAGRAPH
            level=2 if plain_numbered_heading else (1 if ratio>=1.65 else 2 if ratio>=1.28 else 3)
            preliminary.append(ClassifiedBlock((item,),kind,level))
        # A run of numbered, typographically equal short blocks is a visual sequence/list, not headings.
        for i in range(len(preliminary)):
            run=[]; j=i
            while j<len(preliminary) and NUMBERED.match(preliminary[j].text) and len(preliminary[j].text)<=100: run.append(j); j+=1
            if len(run)>=3:
                for k in run: preliminary[k]=replace(preliminary[k],kind=BlockKind.LIST_ITEM,level=0)
        # Join adjacent multiline headings only with equal typography and visual continuity.
        grouped=[]; i=0
        while i<len(preliminary):
            current=preliminary[i]
            if current.kind==BlockKind.HEADING:
                members=list(current.blocks); j=i+1
                while j<len(preliminary) and preliminary[j].kind==BlockKind.HEADING:
                    a=members[-1].block; b=preliminary[j].blocks[0].block
                    if a.page!=b.page or abs(a.font_size-b.font_size)>.5 or abs(visual_bbox(a)[1]-visual_bbox(b)[3])>a.font_size*2: break
                    members.extend(preliminary[j].blocks); j+=1
                grouped.append(ClassifiedBlock(tuple(members),BlockKind.HEADING,current.level)); i=j
            else: grouped.append(current); i+=1
        return grouped
