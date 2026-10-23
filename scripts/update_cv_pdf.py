#!/usr/bin/env python3
"""Append a generated project appendix to the existing CV without redesigning its original pages.

The first run preserves the existing PDF as an immutable base. Later runs always rebuild from
that base, so project pages never duplicate. Update the base PDF deliberately if the core CV changes.
"""

import html
import json
import shutil
import tempfile
from pathlib import Path
from xml.sax.saxutils import escape

from pypdf import PdfReader, PdfWriter
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "public" / "Barshan Ghosh.pdf"
BASE_PATH = ROOT / "cv-source" / "Barshan Ghosh.base.pdf"
DATA_PATH = ROOT / "src" / "data" / "portfolio-showcase.json"


def link(url: str, label: str) -> str:
    safe_url = html.escape(url, quote=True)
    safe_label = escape(label)
    return f'<link href="{safe_url}" color="#087f73">{safe_label}</link>'


def build_appendix(projects: list[dict], output_path: Path) -> None:
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "PortfolioTitle", parent=styles["Title"], fontName="Helvetica-Bold",
        fontSize=21, leading=25, alignment=TA_LEFT, textColor=colors.HexColor("#10252c"),
        spaceAfter=5,
    )
    subtitle_style = ParagraphStyle(
        "PortfolioSubtitle", parent=styles["Normal"], fontName="Helvetica",
        fontSize=9, leading=13, textColor=colors.HexColor("#52656c"), spaceAfter=12,
    )
    project_title_style = ParagraphStyle(
        "ProjectTitle", parent=styles["Heading2"], fontName="Helvetica-Bold",
        fontSize=11.2, leading=14, textColor=colors.HexColor("#10252c"),
        spaceBefore=2, spaceAfter=3,
    )
    description_style = ParagraphStyle(
        "ProjectDescription", parent=styles["BodyText"], fontName="Helvetica",
        fontSize=9, leading=12.5, textColor=colors.HexColor("#26363b"), spaceAfter=4,
    )
    meta_style = ParagraphStyle(
        "ProjectMeta", parent=styles["BodyText"], fontName="Helvetica",
        fontSize=8, leading=11, textColor=colors.HexColor("#52656c"), spaceAfter=9,
    )
    note_style = ParagraphStyle(
        "ProjectNote", parent=styles["BodyText"], fontName="Helvetica-Oblique",
        fontSize=7.5, leading=10, textColor=colors.HexColor("#66777d"), spaceBefore=8,
    )

    document = SimpleDocTemplate(
        str(output_path), pagesize=A4,
        rightMargin=18 * mm, leftMargin=18 * mm,
        topMargin=17 * mm, bottomMargin=17 * mm,
        title="Selected GitHub Projects — Barshan Ghosh",
        author="Barshan Ghosh",
    )
    story = [
        Paragraph("SELECTED SOFTWARE PROJECTS", title_style),
        Paragraph(
            "A curated appendix of public GitHub repositories explicitly marked "
            "with the portfolio-showcase topic.",
            subtitle_style,
        ),
        HRFlowable(width="100%", thickness=1, color=colors.HexColor("#b9d2cf"), spaceAfter=13),
    ]

    for project in projects:
        title = project.get("title") or project.get("name") or "GitHub project"
        description = project.get("description") or "Project details are available in the repository README."
        links = []
        if project.get("url"):
            links.append(link(project["url"], "Source code"))
        if project.get("homepage"):
            links.append(link(project["homepage"], "Live project"))
        meta = []
        if project.get("language"):
            meta.append(escape(project["language"]))
        if project.get("updatedAt"):
            meta.append("Updated " + escape(project["updatedAt"][:10]))
        if links:
            meta.append(" · ".join(links))

        story.append(
            KeepTogether([
                Paragraph(escape(title), project_title_style),
                Paragraph(escape(description), description_style),
                Paragraph("  •  ".join(meta) if meta else "Public GitHub repository", meta_style),
            ])
        )

    story.extend([
        HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#d6e0df"), spaceBefore=3, spaceAfter=7),
        Paragraph(
            "Repository names, descriptions, and links are sourced from GitHub metadata. "
            "No unverified claims about impact, adoption, or completion are added.",
            note_style,
        ),
    ])

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(colors.HexColor("#d6e0df"))
        canvas.line(18 * mm, 12 * mm, A4[0] - 18 * mm, 12 * mm)
        canvas.setFont("Helvetica", 7.5)
        canvas.setFillColor(colors.HexColor("#66777d"))
        canvas.drawString(18 * mm, 7 * mm, "BARSHAN GHOSH  /  SELECTED PROJECTS")
        canvas.drawRightString(A4[0] - 18 * mm, 7 * mm, f"Appendix · {doc.page}")
        canvas.restoreState()

    document.build(story, onFirstPage=footer, onLaterPages=footer)


def main() -> None:
    projects = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    if not projects:
        if BASE_PATH.exists():
            shutil.copy2(BASE_PATH, PDF_PATH)
            print("No showcased repositories remain; restored the original CV PDF.")
        else:
            print("No showcased repositories yet; leaving the existing CV PDF unchanged.")
        return

    if not BASE_PATH.exists():
        BASE_PATH.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(PDF_PATH, BASE_PATH)
        print("Preserved the current CV as the immutable source PDF.")

    with tempfile.TemporaryDirectory() as temporary_directory:
        appendix_path = Path(temporary_directory) / "projects-appendix.pdf"
        output_path = Path(temporary_directory) / "updated-cv.pdf"
        build_appendix(projects, appendix_path)

        writer = PdfWriter()
        for page in PdfReader(str(BASE_PATH)).pages:
            writer.add_page(page)
        for page in PdfReader(str(appendix_path)).pages:
            writer.add_page(page)

        with output_path.open("wb") as output_file:
            writer.write(output_file)
        shutil.copy2(output_path, PDF_PATH)

    print(f"CV refreshed with {len(projects)} showcased GitHub project(s).")


if __name__ == "__main__":
    main()
