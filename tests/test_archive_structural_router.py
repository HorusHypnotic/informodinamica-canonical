import tempfile
import unittest
from pathlib import Path

from pypdf import PdfWriter

from scripts.archive_structural_router import StructuralSignals, analyze_pdf, analyze_with_timeout, route


def signals(**overrides):
    values = dict(pages=2, text_chars=3000, text_blocks=45, short_blocks=12,
                  complex_pages=0, image_pages=0, rectangles=0, line_ops=0,
                  painted_ops=0, checkbox_marks=0, list_markers=0,
                  median_x_bins=2, average_text_density=3000)
    values.update(overrides)
    return StructuralSignals(**values)


class StructuralRouterTests(unittest.TestCase):
    def test_clean_linear_text_is_eligible(self):
        self.assertEqual(route(signals())[0], "LINEAR_TEXT")

    def test_fragmented_form_is_blocked(self):
        result = route(signals(text_chars=800, text_blocks=38, short_blocks=35,
                               complex_pages=2, rectangles=24, line_ops=15))
        self.assertEqual(result[0], "STRUCTURED_TEXT")

    def test_dense_vectors_are_blocked(self):
        self.assertEqual(route(signals(rectangles=80, line_ops=20))[0], "STRUCTURED_TEXT")

    def test_ambiguous_layout_goes_to_review(self):
        result = route(signals(text_chars=2000, text_blocks=55, short_blocks=34,
                               complex_pages=1, rectangles=4, line_ops=8))
        self.assertEqual(result[0], "STRUCTURAL_REVIEW")

    def test_recurring_images_and_recurring_grid_are_not_silent_passes(self):
        self.assertEqual(route(signals(image_pages=2))[0], "STRUCTURAL_REVIEW")
        self.assertEqual(route(signals(complex_pages=2))[0], "STRUCTURAL_REVIEW")

    def test_analysis_does_not_return_text(self):
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "blank.pdf"
            writer = PdfWriter(); writer.add_blank_page(300, 300)
            with path.open("wb") as stream: writer.write(stream)
            result, error = analyze_pdf(path)
            self.assertIsNone(error)
            self.assertEqual(result.text_chars, 0)
            self.assertFalse(hasattr(result, "text"))

    def test_isolated_analysis_completes(self):
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "blank.pdf"
            writer = PdfWriter(); writer.add_blank_page(300, 300)
            with path.open("wb") as stream: writer.write(stream)
            result, error = analyze_with_timeout(path, 5)
            self.assertIsNone(error)
            self.assertEqual(result.pages, 1)


if __name__ == "__main__":
    unittest.main()
