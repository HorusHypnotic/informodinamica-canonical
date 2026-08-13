import hashlib, sqlite3, tempfile, unittest
from contextlib import closing
from pathlib import Path
from pypdf import PdfReader, PdfWriter
from pypdf.generic import DecodedStreamObject, DictionaryObject, NameObject
from scripts.archive_pdf_classifier import Signals, analyze_pdf, analyze_with_timeout, classify, doc_id, unique_pdfs


class PdfClassifierTests(unittest.TestCase):
    def write_pdf(self, path: Path, textual_pages: list[bool]) -> None:
        writer=PdfWriter()
        for textual in textual_pages:
            page=writer.add_blank_page(300,300)
            if textual:
                font=DictionaryObject({NameObject("/Type"):NameObject("/Font"),NameObject("/Subtype"):NameObject("/Type1"),NameObject("/BaseFont"):NameObject("/Helvetica")})
                page[NameObject("/Resources")]=DictionaryObject({NameObject("/Font"):DictionaryObject({NameObject("/F1"):writer._add_object(font)})})
                content=DecodedStreamObject(); content.set_data(b"BT /F1 12 Tf 10 250 Td (This is enough structural text for deterministic classification testing.) Tj ET")
                page[NameObject("/Contents")]=writer._add_object(content)
        with path.open("wb") as stream: writer.write(stream)

    def test_deterministic_heuristics(self):
        cases=[(Signals(10,10,0,10000),"TEXT_NATIVE"),(Signals(10,0,10,0),"SCAN"),
               (Signals(10,5,5,1000),"MIXED"),(Signals(10,9,9,1000),"VISUAL_TECHNICAL"),(Signals(0,0,0,0),"FAILED")]
        for signals,expected in cases:
            self.assertEqual(classify(signals),expected); self.assertEqual(classify(signals),expected)

    def test_doc_id(self):
        self.assertEqual(doc_id("a8f23c19"+"0"*56),"DOC-a8f23c19")

    def test_blank_invalid_and_encrypted_pdf(self):
        with tempfile.TemporaryDirectory() as temporary:
            base=Path(temporary); blank=base/"blank.pdf"; writer=PdfWriter(); writer.add_blank_page(72,72)
            with blank.open("wb") as stream: writer.write(stream)
            self.assertEqual(analyze_pdf(blank)[0],"SCAN")
            invalid=base/"invalid.pdf"; invalid.write_bytes(b"not pdf")
            self.assertEqual(analyze_pdf(invalid)[0],"FAILED")
            protected=base/"protected.pdf"; writer=PdfWriter(); writer.add_blank_page(72,72); writer.encrypt("secret")
            with protected.open("wb") as stream: writer.write(stream)
            self.assertEqual(analyze_pdf(protected)[0],"ENCRYPTED_OR_RESTRICTED")

    def test_textual_and_mixed_pdf_fixtures(self):
        with tempfile.TemporaryDirectory() as temporary:
            base=Path(temporary); textual=base/"textual.pdf"; mixed=base/"mixed.pdf"
            self.write_pdf(textual,[True]); self.write_pdf(mixed,[True,False])
            self.assertEqual(analyze_pdf(textual)[0],"TEXT_NATIVE")
            self.assertEqual(analyze_pdf(mixed)[0],"MIXED")

    def test_no_extracted_text_is_persisted_by_analysis(self):
        with tempfile.TemporaryDirectory() as temporary:
            path=Path(temporary)/"blank.pdf"; writer=PdfWriter(); writer.add_blank_page(72,72)
            with path.open("wb") as stream: writer.write(stream)
            result=analyze_pdf(path)
            self.assertEqual(len(result),4); self.assertIsInstance(result[1],Signals)

    def test_isolated_analysis_completes(self):
        with tempfile.TemporaryDirectory() as temporary:
            path=Path(temporary)/"blank.pdf"; writer=PdfWriter(); writer.add_blank_page(72,72)
            with path.open("wb") as stream: writer.write(stream)
            self.assertEqual(analyze_with_timeout(path,5)[0],"SCAN")

    def test_hash_to_all_paths_is_preserved(self):
        with tempfile.TemporaryDirectory() as temporary:
            base=Path(temporary); root=base/"source"; root.mkdir(); content=b"same-pdf-bytes"
            for name in ("a.pdf","b.pdf"): (root/name).write_bytes(content)
            digest=hashlib.sha256(content).hexdigest(); inventory=base/"inventory.sqlite3"; dedup=base/"dedup.sqlite3"
            with closing(sqlite3.connect(inventory)) as db:
                db.execute("create table run(key text,value text)"); db.execute("create table files(relative_path text,size_bytes integer,extension text)")
                db.executemany("insert into run values (?,?)",[("root",str(root)),("status","COMPLETE")])
                db.executemany("insert into files values (?,?,'.pdf')",[("a.pdf",len(content)),("b.pdf",len(content))]); db.commit()
            with closing(sqlite3.connect(dedup)) as db:
                db.execute("create table hashes(relative_path text,sha256 text,extension text)")
                db.executemany("insert into hashes values (?,?,'.pdf')",[("a.pdf",digest),("b.pdf",digest)]); db.commit()
            _, documents, bytes_hashed=unique_pdfs(inventory,dedup)
            self.assertEqual(bytes_hashed,0); self.assertEqual(len(documents),1)
            self.assertEqual(documents[0]["paths"],["a.pdf","b.pdf"])


if __name__ == "__main__": unittest.main()
