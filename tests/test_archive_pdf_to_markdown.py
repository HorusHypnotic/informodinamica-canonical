import hashlib, json, sqlite3, tempfile, unittest
from contextlib import closing
from pathlib import Path
from pypdf import PdfWriter
from pypdf.generic import DecodedStreamObject, DictionaryObject, NameObject
from scripts.archive_pdf_to_markdown import LayoutLine, convert_document, render_layout, render_markdown, resolve_document


class PdfToMarkdownTests(unittest.TestCase):
    def test_visual_heading_and_plain_heading_uncertainty(self):
        pages=[[LayoutLine("Visual title",10,280,22,300),LayoutLine("Body text continues here.",10,250,11,300)]]
        markdown,stats=render_layout(pages)
        self.assertIn("# Visual title",markdown); self.assertEqual(stats["headings"],1)

    def test_broken_paragraph_and_two_distinct_paragraphs(self):
        pages=[[LayoutLine("First physical line",10,250,11,300),LayoutLine("continues here.",10,237,11,300),
                LayoutLine("A separate paragraph.",10,205,11,300)]]
        markdown,stats=render_layout(pages)
        self.assertIn("First physical line continues here.",markdown)
        self.assertIn("continues here.\n\nA separate",markdown); self.assertEqual(stats["paragraphs"],2)

    def test_simple_numbered_and_multilevel_lists(self):
        pages=[[LayoutLine("• simple",10,250,11,300),LayoutLine("1. numbered",10,230,11,300),
                LayoutLine("1.1 subitem",34,210,11,300),LayoutLine("1.1.1 detail",58,190,11,300)]]
        markdown,stats=render_layout(pages)
        self.assertIn("- simple",markdown); self.assertIn("1. numbered",markdown)
        self.assertIn("   1. subitem",markdown); self.assertIn("      1. detail",markdown); self.assertEqual(stats["lists"],4)

    def test_unicode_and_vector_checklists(self):
        pages=[[LayoutLine("☐ open",10,250,11,300),LayoutLine("☑ done",10,230,11,300),
                LayoutLine("vector state",30,210,11,300,checklist_state="unknown")]]
        markdown,stats=render_layout(pages)
        self.assertIn("- [ ] open",markdown); self.assertIn("- [x] done",markdown)
        self.assertIn("- vector state",markdown); self.assertTrue(any("CHECKLIST_STATE_UNCERTAIN" in x for x in stats["warnings"]))

    def test_heading_is_not_invented_without_evidence(self):
        markdown,stats=render_layout([[LayoutLine("Ordinary short line",10,250,11,300),LayoutLine("body",10,235,11,300)]])
        self.assertNotIn("# Ordinary",markdown); self.assertEqual(stats["headings"],0)

    def test_emission_order_is_preserved_when_coordinates_are_non_monotonic(self):
        pages=[[LayoutLine("First",100,100,11,300),LayoutLine("Second",10,250,11,300),LayoutLine("Third",50,20,11,300)]]
        markdown,_=render_layout(pages)
        self.assertLess(markdown.index("First"),markdown.index("Second")); self.assertLess(markdown.index("Second"),markdown.index("Third"))
    def test_structure_headers_utf8_and_retention(self):
        pages=["HEADER\n1 INTRODUÇÃO\nParágrafo com ação e informação.\n- item\nFOOTER",
               "HEADER\n2 MÉTODO\nOutro parágrafo útil.\n- segundo\nFOOTER",
               "HEADER\n3 FIM\nTexto final.\nFOOTER"]
        markdown,stats=render_markdown(pages)
        self.assertNotIn("HEADER",markdown); self.assertNotIn("FOOTER",markdown)
        self.assertIn("## 1 INTRODUÇÃO",markdown); self.assertIn("- item",markdown)
        self.assertEqual(stats["source_pages"],3); markdown.encode("utf-8")

    def test_ambiguous_table_is_not_invented(self):
        markdown,stats=render_markdown(["Campo    Valor\nA        B"])
        self.assertNotIn("|---|",markdown); self.assertTrue(stats["warnings"])

    def test_numbered_heading_dot_extracted_bullet_and_page_number(self):
        markdown,_=render_markdown(["1. INTRODUÇÃO\n. item extraído\nPagina 1"])
        self.assertIn("## 1. INTRODUÇÃO",markdown); self.assertIn("- item extraído",markdown); self.assertNotIn("Pagina 1",markdown)

    def test_variable_page_footer_is_removed(self):
        pages=[f"Texto {page}\nDocumento interno Pagina {page} de 3" for page in range(1,4)]
        markdown,_=render_markdown(pages)
        self.assertNotIn("Documento interno",markdown)

    def fixture(self, base: Path, source_class="TEXT_NATIVE"):
        root=base/"source"; root.mkdir(); pdf=root/"source.pdf"; writer=PdfWriter(); page=writer.add_blank_page(300,300)
        font=DictionaryObject({NameObject("/Type"):NameObject("/Font"),NameObject("/Subtype"):NameObject("/Type1"),NameObject("/BaseFont"):NameObject("/Helvetica")})
        page[NameObject("/Resources")]=DictionaryObject({NameObject("/Font"):DictionaryObject({NameObject("/F1"):writer._add_object(font)})})
        content=DecodedStreamObject(); content.set_data(b"BT /F1 12 Tf 10 250 Td (SIMPLE HEADING) Tj 0 -20 Td (A deterministic paragraph with enough text.) Tj ET"); page[NameObject("/Contents")]=writer._add_object(content)
        with pdf.open("wb") as stream: writer.write(stream)
        digest=hashlib.sha256(pdf.read_bytes()).hexdigest(); database=base/"classification.sqlite3"
        with closing(sqlite3.connect(database)) as db:
            db.execute("create table run(key text,value text)"); db.execute("create table documents(doc_id text,sha256 text,size_bytes integer,class text,pages integer)"); db.execute("create table paths(doc_id text,relative_path text)")
            db.executemany("insert into run values (?,?)",[("root",str(root)),("parameters",json.dumps({"classifier_version":"1.1.0"}))])
            db.execute("insert into documents values ('DOC-test0001',?,?,?,1)",(digest,pdf.stat().st_size,source_class)); db.execute("insert into paths values ('DOC-test0001','source.pdf')");db.commit()
        return database

    def test_manifest_hash_determinism_and_multipage_contract(self):
        with tempfile.TemporaryDirectory() as temporary:
            base=Path(temporary); database=self.fixture(base); first=convert_document(database,base/"out","DOC-test0001"); second=convert_document(database,base/"out","DOC-test0001")
            self.assertEqual(first["markdown_sha256"],second["markdown_sha256"]); self.assertGreater(first["text_retention_ratio"],0.9)
            manifest=json.loads((base/"out/DOC-test0001/manifest.json").read_text(encoding="utf-8")); self.assertNotIn("path",manifest); self.assertNotIn("filename",manifest)

    def test_rejects_non_text_native(self):
        with tempfile.TemporaryDirectory() as temporary:
            base=Path(temporary); database=self.fixture(base,"SCAN")
            with self.assertRaisesRegex(ValueError,"expected TEXT_NATIVE"): resolve_document(database,"DOC-test0001")


if __name__ == "__main__": unittest.main()
