#!/usr/bin/env python3
"""Build the complete website data source from repository Markdown files."""

import json
import sys
import time
import re
from datetime import date, datetime, timezone
from pathlib import Path

import yaml

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "index.json"
GITHUB = "https://github.com/paimonchan/prompt-eiken-h3/blob/master/"


def parse_document(text):
    match = re.match(r"\A---\s*\n(.*?)\n---\s*(?:\n|$)", text, re.S)
    if not match:
        return {}, text
    metadata = yaml.safe_load(match.group(1)) or {}
    if not isinstance(metadata, dict):
        raise ValueError("Prompt frontmatter must be a YAML mapping")
    # YAML 1.1 interprets an unquoted 9:16 as an integer; preserve ratio text.
    document = yaml.compose(match.group(1))
    for key, value in document.value if document else []:
        if key.value == "ratio" and isinstance(value, yaml.ScalarNode):
            metadata["ratio"] = value.value
    return {key: value.isoformat() if isinstance(value, (date, datetime)) else value
            for key, value in metadata.items()}, text[match.end():].strip()


def scan():
    entries = []
    for collection in ("experiments", "library"):
        for md_path in sorted((REPO / collection).glob("**/*.md")):
            if "ref" in md_path.relative_to(REPO).parts:
                continue
            metadata, content = parse_document(md_path.read_text(encoding="utf-8"))
            if not metadata or not metadata.get("title"):
                continue
            path = md_path.relative_to(REPO).as_posix()
            notes_path = md_path.with_name("notes.md")
            entries.append({
                **metadata,
                "slug": re.sub(r"[^a-z0-9]+", "-", path[:-3].lower()).strip("-"),
                "path": path,
                "url": GITHUB + path,
                "collection": collection,
                "content": content,
                "notes": notes_path.read_text(encoding="utf-8") if notes_path.exists() else "",
            })
    return entries


def resources():
    return [{"slug": path.stem, "collection": folder,
             "title": path.read_text(encoding="utf-8").splitlines()[0].lstrip("# "),
             "content": path.read_text(encoding="utf-8"),
             "url": GITHUB + path.relative_to(REPO).as_posix()}
            for folder in ("guides",)
            for path in sorted((REPO / folder).glob("*.md"))]


def write_index(entries, docs):
    payload = {"generated_at": datetime.now(timezone.utc).isoformat(),
               "count": len(entries), "entries": entries, "resources": docs}
    OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"index.json: {len(entries)} prompts, {len(docs)} resources")


if __name__ == "__main__":
    previous = None
    while True:
        entries, docs = scan(), resources()
        snapshot = json.dumps([entries, docs], sort_keys=True, ensure_ascii=False)
        if snapshot != previous:
            write_index(entries, docs)
            previous = snapshot
        if "--watch" not in sys.argv:
            break
        time.sleep(2)
