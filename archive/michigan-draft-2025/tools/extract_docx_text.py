#!/usr/bin/env python3
"""Extract reasonably structured text from a DOCX.

This is intentionally simple: headings/paragraphs as plain text lines.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from docx import Document as load_document


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("docx", type=str)
    parser.add_argument("--out", type=str, default="docx_text.txt")
    args = parser.parse_args()

    docx_path = Path(args.docx).expanduser().resolve()
    out_path = Path(args.out).expanduser().resolve()
    out_path.parent.mkdir(parents=True, exist_ok=True)

    doc = load_document(str(docx_path))

    lines: list[str] = []
    for p in doc.paragraphs:
        text = (p.text or "").strip()
        if not text:
            continue
        lines.append(text)

    out_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
