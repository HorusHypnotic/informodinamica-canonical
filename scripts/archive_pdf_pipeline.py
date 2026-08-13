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

class OrderDecision(str,Enum):
    KEEP_SOURCE_ORDER="KEEP_SOURCE_ORDER"; USE_GEOMETRY_ORDER="USE_GEOMETRY_ORDER"; ORDER_UNCERTAIN="ORDER_UNCERTAIN"

@dataclass(frozen=True)
class ArbiterParameters:
    version:str="0.4.0"
    coordinate_tolerance:float=2.0
    column_gap_min:float=80.0
    column_gap_width_ratio:float=1.5
    max_overlap_ratio:float=0.10
    min_quality_improvement:float=0.50
    max_geometry_violation_ratio:float=0.0
    min_source_vertical_violation_ratio:float=0.50
    min_anomalous_jump_ratio:float=1.25
    max_indentation_span:float=24.0
    min_blocks_per_column:int=2

@dataclass(frozen=True)
class PageOrderDecision:
    page:int; decision:OrderDecision; source_order:tuple[str,...]; geometry_order:tuple[str,...]
    metrics:dict[str,float|int|bool|str]; parameters:ArbiterParameters

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
    """Arbitrate source and geometry hypotheses without semantic evidence."""
    def __init__(self,parameters:ArbiterParameters|None=None): self.parameters=parameters or ArbiterParameters(); self.decisions:list[PageOrderDecision]=[]

    def _hypotheses(self,source:list[TextBlock]):
        boxes={x.block_id:visual_bbox(x) for x in source}; centers={x.block_id:((boxes[x.block_id][0]+boxes[x.block_id][2])/2,(boxes[x.block_id][1]+boxes[x.block_id][3])/2) for x in source}
        widths=sorted(max(1,boxes[x.block_id][2]-boxes[x.block_id][0]) for x in source); median_width=statistics.median(widths)
        ordered_x=sorted(source,key=lambda x:(centers[x.block_id][0],x.source_order)); gaps=[(centers[ordered_x[i].block_id][0]-centers[ordered_x[i-1].block_id][0],i) for i in range(1,len(ordered_x))]
        largest_gap,split_index=max(gaps,default=(0,0)); threshold=max(self.parameters.column_gap_min,median_width*self.parameters.column_gap_width_ratio)
        left,right=ordered_x[:split_index],ordered_x[split_index:]; columns=largest_gap>=threshold and len(left)>=self.parameters.min_blocks_per_column and len(right)>=self.parameters.min_blocks_per_column
        if columns:
            column={x.block_id:0 for x in left}|{x.block_id:1 for x in right}
            geometry=sorted(left,key=lambda x:(-centers[x.block_id][1],centers[x.block_id][0],x.source_order))+sorted(right,key=lambda x:(-centers[x.block_id][1],centers[x.block_id][0],x.source_order))
        else:
            column={x.block_id:0 for x in source}; geometry=sorted(source,key=lambda x:(-centers[x.block_id][1],centers[x.block_id][0],x.source_order))
        return geometry,boxes,centers,column,columns,largest_gap,threshold

    def _quality(self,order,centers,column):
        comparable=vertical=0; switches=backtracks=0
        for first,second in zip(order,order[1:]):
            ca,cb=column[first.block_id],column[second.block_id]
            if ca==cb:
                comparable+=1
                if centers[second.block_id][1]>centers[first.block_id][1]+self.parameters.coordinate_tolerance: vertical+=1
            else:
                switches+=1
                if cb<ca: backtracks+=1
        violations=vertical+backtracks+max(0,switches-1)
        denominator=max(1,comparable+max(0,len(order)-1-comparable))
        return {"vertical_inversions":vertical,"column_switches":switches,"column_backtracks":backtracks,"violation_ratio":violations/denominator,"quality":1-(violations/denominator)}

    def _overlap_ratio(self,source,boxes):
        overlaps=pairs=0
        for i,a in enumerate(source):
            ax0,ay0,ax1,ay1=boxes[a.block_id]
            for b in source[i+1:]:
                bx0,by0,bx1,by1=boxes[b.block_id]; pairs+=1
                if min(ax1,bx1)>max(ax0,bx0) and min(ay1,by1)>max(ay0,by0): overlaps+=1
        return overlaps/max(1,pairs)

    def arbitrate_page(self,source:list[TextBlock])->PageOrderDecision:
        page=source[0].page if source else 0
        if len(source)<2:
            ids=tuple(x.block_id for x in source); return PageOrderDecision(page,OrderDecision.KEEP_SOURCE_ORDER,ids,ids,{"reason":"INSUFFICIENT_BLOCKS"},self.parameters)
        geometry,boxes,centers,column,columns,gap,threshold=self._hypotheses(source)
        source_quality=self._quality(source,centers,column); geometry_quality=self._quality(geometry,centers,column)
        conflict=sum(a.block_id!=b.block_id for a,b in zip(source,geometry))/len(source)
        overlap=self._overlap_ratio(source,boxes)
        transforms_axis_aligned=all(abs(x.transform[1])<=1e-9 and abs(x.transform[2])<=1e-9 and abs(x.transform[0])>1e-9 and abs(x.transform[3])>1e-9 for x in source)
        geometry_available=all(any(abs(v)>self.parameters.coordinate_tolerance for v in boxes[x.block_id]) for x in source)
        stable=geometry==self._hypotheses(list(reversed(source)))[0]
        improvement=geometry_quality["quality"]-source_quality["quality"]
        transitions=[abs(centers[b.block_id][1]-centers[a.block_id][1]) for a,b in zip(source,source[1:])]
        typical_jump=statistics.median(transitions) if transitions else 0
        upward_jumps=[centers[b.block_id][1]-centers[a.block_id][1] for a,b in zip(source,source[1:]) if centers[b.block_id][1]>centers[a.block_id][1]+self.parameters.coordinate_tolerance]
        anomalous_jump=max(upward_jumps,default=0)/max(self.parameters.coordinate_tolerance,typical_jump)
        indentation_span=max(centers[x.block_id][0] for x in source)-min(centers[x.block_id][0] for x in source)
        strong_vertical=(not columns and source_quality["vertical_inversions"]>0 and source_quality["violation_ratio"]>=self.parameters.min_source_vertical_violation_ratio and anomalous_jump>=self.parameters.min_anomalous_jump_ratio and indentation_span<=self.parameters.max_indentation_span)
        strong_columns=(columns and source_quality["column_switches"]>1 and geometry_quality["column_switches"]==1)
        objective=(conflict>0 and transforms_axis_aligned and geometry_available and stable and overlap<=self.parameters.max_overlap_ratio and geometry_quality["violation_ratio"]<=self.parameters.max_geometry_violation_ratio and improvement>=self.parameters.min_quality_improvement and (strong_vertical or strong_columns))
        if conflict==0: decision=OrderDecision.KEEP_SOURCE_ORDER
        elif objective: decision=OrderDecision.USE_GEOMETRY_ORDER
        else: decision=OrderDecision.ORDER_UNCERTAIN
        metrics={"conflict_ratio":round(conflict,6),"source_quality":round(source_quality["quality"],6),"geometry_quality":round(geometry_quality["quality"],6),"quality_improvement":round(improvement,6),"source_vertical_inversions":source_quality["vertical_inversions"],"geometry_vertical_inversions":geometry_quality["vertical_inversions"],"source_column_switches":source_quality["column_switches"],"geometry_column_switches":geometry_quality["column_switches"],"anomalous_jump_ratio":round(anomalous_jump,6),"indentation_span":round(indentation_span,6),"overlap_ratio":round(overlap,6),"columns_detected":columns,"column_gap":round(gap,6),"column_gap_threshold":round(threshold,6),"axis_aligned_transforms":transforms_axis_aligned,"geometry_available":geometry_available,"geometry_stable":stable}
        return PageOrderDecision(page,decision,tuple(x.block_id for x in source),tuple(x.block_id for x in geometry),metrics,self.parameters)

    def order(self,blocks:list[TextBlock])->list[OrderedBlock]:
        result=[]; self.decisions=[]
        for page in sorted({x.page for x in blocks}):
            source=sorted((x for x in blocks if x.page==page),key=lambda x:x.source_order)
            arbitration=self.arbitrate_page(source); self.decisions.append(arbitration)
            chosen=list(arbitration.geometry_order) if arbitration.decision==OrderDecision.USE_GEOMETRY_ORDER else list(arbitration.source_order)
            by_id={x.block_id:x for x in source}
            result.extend(OrderedBlock(by_id[block_id],len(result),arbitration.decision.value) for block_id in chosen)
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
