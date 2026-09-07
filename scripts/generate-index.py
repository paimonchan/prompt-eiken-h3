#!/usr/bin/env python3
"""
Generate index.json from all prompt .md files in experiments/ and library/.

Scan YAML frontmatter, extract fields, output flat JSON array.
Usage:
    python scripts/generate-index.py [--watch]
"""

import json, os, sys, time, re
from pathlib import Path
from datetime import datetime

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "index.json"

FIELDS = {
    "title": "str",
    "mode": "str",
    "type": "str",
    "ver": "int",
    "date": "str",
    "status": "str",
    "seed": "nullable_int",
    "steps": "int",
    "duration": "int",
    "ratio": "str",
    "resolution": "str",
    "tags": "list",
    "ref_mode": "str",
}


def clean_str(v):
    """Strip surrounding quotes from a string value."""
    v = v.strip()
    if (v.startswith('"') and v.endswith('"')) or (
        v.startswith("'") and v.endswith("'")
    ):
        v = v[1:-1]
    return v


def parse_frontmatter(text):
    lines = text.split("\n")
    if not lines or lines[0].strip() != "---":
        return {}
    end = 1
    while end < len(lines) and lines[end].strip() != "---":
        end += 1

    data = {}
    for line in lines[1:end]:
        if ":" not in line:
            continue
        key, _, val = line.partition(":")
        key = key.strip()
        val = val.strip()
        if key not in FIELDS:
            continue
        ftype = FIELDS[key]

        if ftype == "list":
            # [a, b, c] or [a,b,c]
            val = val.strip()
            if val.startswith("[") and val.endswith("]"):
                raw = val[1:-1]
                items = [clean_str(v) for v in raw.split(",") if v.strip()]
                data[key] = items
            else:
                data[key] = []
        elif ftype == "int":
            try:
                data[key] = int(val)
            except ValueError:
                data[key] = 0
        elif ftype == "nullable_int":
            if val.lower() == "null" or val.lower() == "none" or val == "":
                data[key] = None
            else:
                try:
                    data[key] = int(val)
                except ValueError:
                    data[key] = None
        elif ftype == "str":
            data[key] = clean_str(val)
    return data


def scan():
    entries = []
    for md_path in sorted(REPO.glob("experiments/**/*.md")):
        if "ref/" in str(md_path):
            continue
        text = md_path.read_text(encoding="utf-8")
        fm = parse_frontmatter(text)
        if not fm:
            continue
        path = str(md_path.relative_to(REPO))
        slug = re.sub(r"[^a-z0-9]+", "-", path.replace(".md", "").lower()).strip("-")
        entry = {
            "slug": slug,
            "path": path,
            "url": f"https://github.com/paimonchan/prompt-eiken-h3/blob/main/{path}",
            **fm,
        }
        entries.append(entry)

    for md_path in sorted(REPO.glob("library/**/*.md")):
        text = md_path.read_text(encoding="utf-8")
        fm = parse_frontmatter(text)
        if not fm:
            continue
        path = str(md_path.relative_to(REPO))
        slug = re.sub(r"[^a-z0-9]+", "-", path.replace(".md", "").lower()).strip("-")
        entry = {
            "slug": slug,
            "path": path,
            "url": f"https://github.com/paimonchan/prompt-eiken-h3/blob/main/{path}",
            **fm,
        }
        entries.append(entry)
    return entries


def write_index(entries):
    payload = {
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "count": len(entries),
        "entries": entries,
    }
    OUT.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    print(f"✅ index.json — {len(entries)} entries")


if __name__ == "__main__":
    entries = scan()
    write_index(entries)
    if "--watch" in sys.argv:
        print("👀  Watching for changes... (Ctrl+C to stop)")
        seen = set()
        while True:
            time.sleep(2)
            new_entries = scan()
            key = tuple((e["path"], e.get("ver", 0)) for e in new_entries)
            if key != seen:
                write_index(new_entries)
                seen = key