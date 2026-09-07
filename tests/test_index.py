import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('indexer', Path(__file__).parents[1] / 'scripts/generate-index.py')
indexer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(indexer)


class IndexTests(unittest.TestCase):
    def test_empty_frontmatter_is_skipped(self):
        self.assertEqual(indexer.parse_document('---\n\n---\nBody'), ({}, 'Body'))

    def test_yaml_frontmatter_supports_multiline_and_inline_comments(self):
        metadata, content = indexer.parse_document('---\ntitle: "A: story"\nmode: t2va # comment\ndate: 2026-09-07\ntags:\n  - loop\n  - "two, parts"\n---\n\n<Picture 1>\nDialogue')
        self.assertEqual(metadata['mode'], 't2va')
        self.assertEqual(metadata['date'], '2026-09-07')
        self.assertEqual(metadata['tags'], ['loop', 'two, parts'])
        self.assertEqual(content, '<Picture 1>\nDialogue')

    def test_catalog_contains_content_and_portable_paths(self):
        entries = indexer.scan()
        self.assertGreater(len(entries), 0)
        for entry in entries:
            self.assertNotIn('\\', entry['path'])
            self.assertTrue(entry['content'])
            self.assertFalse(entry['content'].startswith('---'))
        self.assertTrue(any(entry['notes'] for entry in entries))
        self.assertEqual(entries[0]['ratio'], '9:16')


if __name__ == '__main__':
    unittest.main()
