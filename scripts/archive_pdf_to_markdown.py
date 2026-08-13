#!/usr/bin/env python3
"""Convert validated TEXT_NATIVE PDFs to provenance-tracked Markdown locally."""

from __future__ import annotations

import argparse, hashlib, json, math, re, sqlite3, statistics, time
from collections import Counter
from contextlib import closing
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from pypdf import PdfReader
from pypdf.generic import ContentStream
try:
    from scripts.archive_pdf_pipeline import BlockKind, OrderDecision, ReadingOrderEngine, StructureClassifier, TextBlock
except ModuleNotFoundError:  # direct execution: python scripts/archive_pdf_to_markdown.py
    from archive_pdf_pipeline import BlockKind, OrderDecision, ReadingOrderEngine, StructureClassifier, TextBlock

CONVERTER_VERSION = "0.4.0"
PAGE_MARKER = "<!-- source-page: {page} -->"
CONTROL_RE = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")
NUMBERED_HEADING_RE = re.compile(r"^\d+(?:\.\d+)*\.?\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ]")
LIST_RE = re.compile(r"^(?P<marker>[-*•▪◦]|\.|\d+(?:\.\d+)*[.)]?|[A-Za-z][.)])\s+(?P<body>.+)$")
CHECK_RE = re.compile(r"^(?P<mark>□|☐|☑|✓|\[\s?\]|\[[xX]\])\s*(?P<body>.+)$")

@dataclass(frozen=True)
class LayoutLine:
    text: str
    x: float = 0
    y: float = 0
    font_size: float = 0
    page_width: float = 0
    checklist_state: str | None = None

def sha256_bytes(data: bytes) -> str: return hashlib.sha256(data).hexdigest()
def normalized_chars(text: str) -> int: return sum(c.isalnum() for c in text)
def normalize_line(line: str) -> str: return re.sub(r"\s+", " ", CONTROL_RE.sub("", line)).strip()
def margin_key(line: str) -> str: return re.sub(r"\d+", "#", normalize_line(line)).casefold()

def extract_layout(page) -> list[LayoutLine]:
    """Collect transient text geometry and merge fragments on the same baseline."""
    ordered=[normalize_line(line) for line in (page.extract_text() or "").splitlines() if normalize_line(line)]
    fragments=[]; width=float(page.mediabox.width)
    def visitor(text, _cm, tm, _font, size):
        value=CONTROL_RE.sub("", text or "")
        for offset, part in enumerate(value.splitlines()):
            if part.strip(): fragments.append((float(tm[5])-offset*float(size or 0)*1.2,float(tm[4]),float(size or 0),part.strip()))
    page.extract_text(visitor_text=visitor)
    groups=[]
    for y,x,size,text in fragments:
        if groups and abs(groups[-1][0]-y)<=max(2,size*.20): groups[-1][1].append((x,size,text))
        else: groups.append([y,[(x,size,text)]])
    boxes=[]
    try:
        for operands,operator in ContentStream(page.get_contents(),page.pdf).operations:
            if operator==b"re" and len(operands)>=4:
                x,y,w,h=map(float,operands[:4])
                if 5<=abs(w)<=24 and 5<=abs(h)<=24: boxes.append((x,y,w,h))
    except Exception: pass
    geometric=[]
    for y,items in groups:
        text=""; previous_end=None
        for x,size,part in items:
            if text and (previous_end is None or x-previous_end>max(3,size*.10)): text += " "
            text += part; previous_end=x+len(part)*size*.48
        x=items[0][0]; state="unknown" if any(bx+abs(bw)<=x+8 and abs(by-y)<=max(12,abs(bh)) for bx,by,bw,bh in boxes) else None
        geometric.append(LayoutLine(normalize_line(text),x,y,max(i[1] for i in items),width,state))
    # pypdf's canonical extraction order is more reliable than coordinate sorting for
    # PDFs with transformed text matrices. Geometry annotates that order; it never replaces it.
    lines=[]
    for text in ordered:
        key=''.join(c.casefold() for c in text if c.isalnum())
        matches=[]
        for candidate in geometric:
            ckey=''.join(c.casefold() for c in candidate.text if c.isalnum())
            overlap=min(len(ckey),len(key))/max(1,max(len(ckey),len(key)))
            if len(ckey)>=4 and overlap>=.80 and (ckey in key or key in ckey): matches.append(candidate)
        if matches:
            first=matches[0]; size=max(x.font_size for x in matches); x=min(x.x for x in matches)
            state=next((x.checklist_state for x in matches if x.checklist_state),None)
            lines.append(LayoutLine(text,x,first.y,size,width,state))
        else:
            lines.append(LayoutLine(text,0,0,0,width))
    return lines

def repeated_margins(pages: list[list[LayoutLine]]) -> set[str]:
    if len(pages)<3: return set()
    counts=Counter()
    for lines in pages:
        values=[normalize_line(x.text) for x in lines if normalize_line(x.text)]
        for line in set(values[:2]+values[-2:]):
            if 1<len(line)<=160: counts[margin_key(line)]+=1
    threshold=math.ceil(len(pages)*.60)
    return {key for key,count in counts.items() if count>=threshold}

def list_item(line: LayoutLine, base_x: float) -> tuple[str,int,str]|None:
    if line.checklist_state=="unknown": return "-",max(0,round((line.x-base_x)/24)),line.text
    check=CHECK_RE.match(line.text)
    if check:
        mark=check.group('mark'); state='x' if mark in ('☑','✓','[x]','[X]') else ' '
        return f"- [{state}]",max(0,round((line.x-base_x)/24)),check.group('body')
    match=LIST_RE.match(line.text)
    if not match: return None
    marker=match.group('marker'); depth=max(0,round((line.x-base_x)/24))
    if marker[0].isdigit():
        depth=max(depth,marker.rstrip('.)').count('.')); output=f"{marker.split('.')[0]}."
    else: output='-'
    return output,depth,match.group('body')

def render_layout(pages: list[list[LayoutLine]]) -> tuple[str,dict]:
    margins=repeated_margins(pages); output=[]; warnings=[]; headings=lists=paragraphs=checklists=0; order_bases=Counter(); decision_counts=Counter(); class_counts=Counter(); page_decisions=[]; engine=ReadingOrderEngine()
    all_sizes=[line.font_size for page in pages for line in page if line.font_size>0 and len(line.text)>20]
    body_size=statistics.median(all_sizes) if all_sizes else 0
    for page_number,raw_lines in enumerate(pages,1):
        output += [PAGE_MARKER.format(page=page_number),""]
        lines=[x for x in raw_lines if x.text and margin_key(x.text) not in margins and not re.fullmatch(r"(?:page|p[aá]gina)?\s*\d+(?:\s+de\s+\d+)?",x.text,re.I)]
        blocks=[TextBlock(f"{page_number}:{i}",page_number,x.text,(x.x,x.y,x.x+max(1,len(x.text)*max(x.font_size,1)*.48),x.y+max(x.font_size,1)),x.font_size,source_order=i,checklist_state=x.checklist_state) for i,x in enumerate(lines)]
        ordered=engine.order(blocks); classified=StructureClassifier().classify(ordered)
        order_bases.update(x.order_basis for x in ordered); class_counts.update(x.kind.value for x in classified)
        arbitration=engine.decisions[0] if engine.decisions else engine.arbitrate_page(blocks)
        decision_counts[arbitration.decision.value]+=1
        warning={OrderDecision.KEEP_SOURCE_ORDER:"READING_ORDER_SOURCE_PRESERVED",OrderDecision.USE_GEOMETRY_ORDER:"READING_ORDER_GEOMETRY_SELECTED",OrderDecision.ORDER_UNCERTAIN:"READING_ORDER_UNCERTAIN"}[arbitration.decision]
        warnings.append(warning)
        page_decisions.append({"page":page_number,"decision":arbitration.decision.value,"source_order":list(arbitration.source_order),"geometry_order":list(arbitration.geometry_order),"metrics":arbitration.metrics})
        by_id={f"{page_number}:{i}":x for i,x in enumerate(lines)}
        lines=[by_id[x.block.block_id] for x in ordered]
        base_x=min((x.x for x in lines),default=0); gaps=sorted(lines[i-1].y-lines[i].y for i in range(1,len(lines)) if lines[i-1].y>lines[i].y)
        normal_gap=statistics.median(gaps[:max(1,math.ceil(len(gaps)/2))]) if gaps else (body_size*1.2 or 12); current=[]; previous=None
        def flush():
            nonlocal paragraphs
            if current: output.extend([" ".join(current),""]); current.clear(); paragraphs+=1
        for classified_block in classified:
            line=by_id[classified_block.blocks[0].block.block_id]; text=classified_block.text
            item=list_item(LayoutLine(text,line.x,line.y,line.font_size,line.page_width,line.checklist_state),base_x)
            if classified_block.kind==BlockKind.HEADING:
                flush(); output += [f"{'#'*classified_block.level} {text}",""]; headings+=1
            elif classified_block.kind in (BlockKind.LIST_ITEM,BlockKind.CHECKLIST_ITEM) and item:
                flush(); marker,depth,body=item; output += [f"{'   '*depth}{marker} {body}",""]; lists+=1; checklists+=int(classified_block.kind==BlockKind.CHECKLIST_ITEM)
                if line.checklist_state=="unknown": warnings.append(f"PAGE_{page_number}_CHECKLIST_STATE_UNCERTAIN")
            elif re.search(r"\S(?:\s{3,}|\t+)\S",text):
                flush(); output += [text,""]; warnings.append(f"PAGE_{page_number}_TABLE_OR_COLUMNS_AMBIGUOUS")
            else:
                boundary=previous is not None and ((previous.y-line.y)>normal_gap*1.55 or abs(line.x-previous.x)>max(18,body_size*1.5))
                if boundary: flush()
                current.append(text)
            previous=line
        flush()
    markdown="\n".join(output).rstrip()+"\n"
    if not markdown.strip(): warnings.append("EMPTY_OUTPUT")
    return markdown,{"headings":headings,"lists":lists,"checklists":checklists,"paragraphs":paragraphs,"tables":0,
        "source_pages":len(pages),"warnings":sorted(set(warnings)),"repeated_margins_removed":len(margins),"body_font_size":body_size,
        "reading_order_arbiter_version":engine.parameters.version,"reading_order_parameters":engine.parameters.__dict__,"reading_order_decisions":page_decisions,
        "reading_order_decision_counts":dict(decision_counts),"reading_order_block_counts":dict(order_bases),"classified_blocks":dict(class_counts)}

def render_markdown(page_texts: list[str]) -> tuple[str,dict]:
    """Compatibility renderer for plain-text fixtures; geometry is intentionally unavailable."""
    pages=[[LayoutLine(CONTROL_RE.sub("",text).strip(),0,-i,0,0) for i,text in enumerate(page.splitlines()) if normalize_line(text)] for page in page_texts]
    return render_layout(pages)

def resolve_document(classification: Path, doc_id: str) -> tuple[Path,dict]:
    with closing(sqlite3.connect(classification)) as db:
        run=dict(db.execute("SELECT key,value FROM run")); row=db.execute("SELECT doc_id,sha256,size_bytes,class,pages FROM documents WHERE doc_id=?",(doc_id,)).fetchone()
        if row is None: raise ValueError(f"unknown doc_id: {doc_id}")
        if row[3]!="TEXT_NATIVE": raise ValueError(f"{doc_id} has class {row[3]}, expected TEXT_NATIVE")
        relative=db.execute("SELECT relative_path FROM paths WHERE doc_id=? ORDER BY relative_path LIMIT 1",(doc_id,)).fetchone()[0]
    return Path(run['root'])/Path(relative),{"doc_id":row[0],"source_sha256":row[1],"source_size_bytes":row[2],"source_class":row[3],"source_pages":row[4],"classifier_version":json.loads(run['parameters'])['classifier_version']}

def convert_document(classification: Path, output_root: Path, identity: str) -> dict:
    started=time.perf_counter(); source,provenance=resolve_document(classification.resolve(strict=True),identity); reader=PdfReader(source,strict=False)
    pages=[extract_layout(page) for page in reader.pages]; raw_text="\n".join(line.text for page in pages for line in page); markdown,structure=render_layout(pages); data=markdown.encode()
    source_chars=normalized_chars(raw_text); markdown_chars=normalized_chars(re.sub(r"<!-- source-page: \d+ -->","",markdown)); retention=markdown_chars/source_chars if source_chars else 0
    warnings=list(structure['warnings'])
    if retention<.90: warnings.append('LOW_TEXT_RETENTION')
    if retention>1.05: warnings.append('POSSIBLE_TEXT_DUPLICATION')
    destination=output_root.resolve()/identity; destination.mkdir(parents=True,exist_ok=True); (destination/'document.md').write_bytes(data)
    manifest={**provenance,"converter_version":CONVERTER_VERSION,"conversion_timestamp":datetime.now(timezone.utc).replace(microsecond=0).isoformat(),"markdown_sha256":sha256_bytes(data),"markdown_size_bytes":len(data),"validation_status":"PASS" if not warnings else "PASS_WITH_WARNINGS","text_retention_ratio":round(retention,6),"source_text_characters":source_chars,"markdown_text_characters":markdown_chars,"markdown_lines":len(markdown.splitlines()),"markdown_words":len(markdown.split()),"estimated_tokens":math.ceil(len(markdown)/4),"token_estimation":"ceil(markdown_characters_total/4)","structure":structure,"warnings":sorted(set(warnings)),"conversion_seconds":round(time.perf_counter()-started,6)}
    (destination/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding='utf-8',newline='\n'); return manifest

def main():
    p=argparse.ArgumentParser(); p.add_argument('--classification',type=Path,required=True); p.add_argument('--output',type=Path,required=True); p.add_argument('--doc-id',action='append',required=True); a=p.parse_args()
    results=[convert_document(a.classification,a.output,i) for i in a.doc_id]; print(json.dumps([{k:x[k] for k in ('doc_id','validation_status','text_retention_ratio','markdown_size_bytes','estimated_tokens','conversion_seconds','warnings')} for x in results],ensure_ascii=False)); return 0
if __name__=='__main__': raise SystemExit(main())
