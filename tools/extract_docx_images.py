#!/usr/bin/env python3
"""Extract all embedded images from a DOCX (in the order they appear).

Outputs:
- images/ directory containing numbered images
- images_manifest.json describing each image (order, relationship id, filename, size)

This uses python-docx to walk runs and find inline shapes that represent pictures.
"""

from __future__ import annotations

import argparse
import json
import os
from dataclasses import asdict, dataclass
from pathlib import Path

from docx import Document as load_document
from docx.document import Document as DocxDocument


@dataclass(frozen=True)
class ImageEntry:
    index: int
    rel_id: str
    filename: str
    bytes: int


def iter_picture_rel_ids_in_order(doc: DocxDocument):
    # Pictures live in runs as Drawing elements. We look for blip elements and pull the embed rel id.
    # This tends to preserve visual order in the document.
    r_ns = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"

    for paragraph in doc.paragraphs:
        for run in paragraph.runs:
            # run._element is a CT_R object. Search its subtree.
            for blip in run._element.xpath(".//*[local-name()='blip']"):
                rel_id = blip.get(f"{{{r_ns}}}embed")
                if rel_id:
                    yield rel_id


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("docx", type=str, help="Path to .docx")
    parser.add_argument(
        "--out",
        type=str,
        default="images",
        help="Output directory for extracted images (default: images)",
    )
    parser.add_argument(
        "--manifest",
        type=str,
        default="images_manifest.json",
        help="Manifest filename (default: images_manifest.json)",
    )
    args = parser.parse_args()

    docx_path = Path(args.docx).expanduser().resolve()
    out_dir = Path(args.out).expanduser().resolve()
    out_dir.mkdir(parents=True, exist_ok=True)

    doc = load_document(str(docx_path))

    seen = set()
    entries: list[ImageEntry] = []

    for rel_id in iter_picture_rel_ids_in_order(doc):
        # A picture can be referenced multiple times; keep first occurrence order.
        if rel_id in seen:
            continue
        seen.add(rel_id)

        part = doc.part.related_parts.get(rel_id)
        if part is None:
            continue

        blob = part.blob
        ext = os.path.splitext(part.partname)[1].lstrip(".") or "bin"
        filename = f"img_{len(entries)+1:02d}.{ext}"
        (out_dir / filename).write_bytes(blob)
        entries.append(
            ImageEntry(
                index=len(entries) + 1,
                rel_id=rel_id,
                filename=filename,
                bytes=len(blob),
            )
        )

    manifest = {
        "source": str(docx_path),
        "output_dir": str(out_dir),
        "count": len(entries),
        "images": [asdict(e) for e in entries],
    }

    (out_dir / args.manifest).write_text(
        json.dumps(manifest, indent=2), encoding="utf-8"
    )

    print(f"Extracted {len(entries)} images to: {out_dir}")
    print(f"Manifest: {out_dir / args.manifest}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
