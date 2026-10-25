#!/usr/bin/env python3
"""Generate the complete, monochrome, two-page CV PDF (no appended appendix)."""
import html
import json
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import HRFlowable, KeepTogether, PageBreak, Paragraph, SimpleDocTemplate

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "public" / "Barshan Ghosh.pdf"
PROJECTS_PATH = ROOT / "cv-projects.json"
BLACK = colors.black
DARK = colors.HexColor("#222222")
GRAY = colors.HexColor("#444444")


def linked(url: str, label: str) -> str:
    return f'<link href="{html.escape(url, quote=True)}" color="#000000"><u>{escape(label)}</u></link>'


def make_styles():
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle("Name", parent=base["Title"], fontName="Helvetica-Bold", fontSize=18, leading=20, alignment=TA_CENTER, textColor=BLACK, spaceAfter=2),
        "headline": ParagraphStyle("Headline", parent=base["Normal"], fontName="Times-Bold", fontSize=9, leading=11, alignment=TA_CENTER, textColor=BLACK, spaceAfter=3),
        "contact": ParagraphStyle("Contact", parent=base["Normal"], fontName="Times-Roman", fontSize=7.8, leading=9, alignment=TA_CENTER, textColor=BLACK, spaceAfter=2),
        "section": ParagraphStyle("Section", parent=base["Heading2"], fontName="Helvetica-Bold", fontSize=9.2, leading=11, textColor=BLACK, spaceBefore=5, spaceAfter=3, keepWithNext=True),
        "summary": ParagraphStyle("Summary", parent=base["BodyText"], fontName="Times-Roman", fontSize=8.2, leading=10.2, textColor=DARK, spaceAfter=1),
        "skill": ParagraphStyle("Skill", parent=base["BodyText"], fontName="Times-Roman", fontSize=8.1, leading=9.7, textColor=DARK, spaceAfter=1),
        "project_title": ParagraphStyle("ProjectTitle", parent=base["BodyText"], fontName="Times-Bold", fontSize=8.6, leading=10.2, textColor=BLACK, spaceBefore=2, spaceAfter=0, keepWithNext=True),
        "project_desc": ParagraphStyle("ProjectDesc", parent=base["BodyText"], fontName="Times-Roman", fontSize=8.1, leading=9.7, textColor=DARK, spaceAfter=0),
        "project_link": ParagraphStyle("ProjectLink", parent=base["BodyText"], fontName="Times-Roman", fontSize=7.4, leading=8.4, textColor=BLACK, spaceAfter=2),
        "role": ParagraphStyle("Role", parent=base["BodyText"], fontName="Times-Bold", fontSize=8.4, leading=10, textColor=BLACK, spaceBefore=2.5, spaceAfter=0, keepWithNext=True),
        "org": ParagraphStyle("Org", parent=base["BodyText"], fontName="Times-Italic", fontSize=7.8, leading=9, textColor=DARK, spaceAfter=0, keepWithNext=True),
        "bullet": ParagraphStyle("Bullet", parent=base["BodyText"], fontName="Times-Roman", fontSize=7.7, leading=9, leftIndent=9, firstLineIndent=-6, textColor=DARK, spaceAfter=0),
        "normal": ParagraphStyle("NormalSmall", parent=base["BodyText"], fontName="Times-Roman", fontSize=7.8, leading=9.2, textColor=DARK, spaceAfter=1),
    }


def add_section(story, title, styles):
    story.append(Paragraph(escape(title.upper()), styles["section"]))


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#777777"))
    canvas.setLineWidth(0.45)
    canvas.line(0.55 * inch, 0.38 * inch, letter[0] - 0.55 * inch, 0.38 * inch)
    canvas.setFont("Times-Roman", 7)
    canvas.setFillColor(GRAY)
    canvas.drawCentredString(letter[0] / 2, 0.22 * inch, f"BARSHAN GHOSH  •  MASTER CV  •  {doc.page}")
    canvas.restoreState()


def main():
    projects = json.loads(PROJECTS_PATH.read_text(encoding="utf-8"))
    PDF_PATH.parent.mkdir(parents=True, exist_ok=True)
    styles = make_styles()
    doc = SimpleDocTemplate(str(PDF_PATH), pagesize=letter, rightMargin=0.55*inch, leftMargin=0.55*inch, topMargin=0.38*inch, bottomMargin=0.52*inch, title="Barshan Ghosh — CV", author="Barshan Ghosh")
    story = []

    # Page 1: profile, skills, and selected projects.
    story.append(Paragraph("BARSHAN GHOSH", styles["name"]))
    story.append(HRFlowable(width="100%", thickness=0.7, color=BLACK, spaceBefore=1, spaceAfter=3))
    story.append(Paragraph("Computer Science Graduate | Software &amp; IT Systems | Applied AI | Technology Education", styles["headline"]))
    story.append(Paragraph("+880 1624-811454  |  barshan.ghoshofficial@gmail.com  |  Narayanganj, Bangladesh", styles["contact"]))
    story.append(Paragraph("  |  ".join([linked("https://portfolio-beta-eight-b4vx6dfs83.vercel.app", "Portfolio"), linked("https://github.com/barshan94?tab=repositories", "All GitHub Repositories"), linked("https://github.com/barshan94", "GitHub Profile"), linked("https://www.linkedin.com/in/barshan-ghosh/", "LinkedIn")]), styles["contact"]))

    add_section(story, "Professional Summary", styles)
    story.append(Paragraph("Computer Science and Engineering graduate (CGPA 3.83/4.00) with experience across IT operations and consulting, web/software projects, applied AI/ML learning, digital marketing, and technology education. Builds practical projects using modern web technologies and database-backed systems, with a particular focus on data integrity, workflow automation, and usable tools for real-world problems. Also experienced in school IT coordination, computer instruction, and private tutoring.", styles["summary"]))

    add_section(story, "Technical Skills", styles)
    skills = [
        ("Web &amp; Software", "Next.js, React, Astro, TypeScript, JavaScript, HTML/CSS, Tailwind CSS, Node.js, REST APIs"),
        ("Databases &amp; Platforms", "PostgreSQL, Supabase, MySQL, Firebase, SQL Server, WordPress, Shopify"),
        ("AI, Data &amp; Testing", "Python, Weka, TensorFlow/Keras fundamentals, Power BI, Vitest, Playwright, Kaggle"),
        ("Systems &amp; Tools", "Git/GitHub, Vercel, Linux, Windows, hardware and network troubleshooting, Docker basics"),
        ("Digital &amp; Education Tools", "SEO, GA4, Google Tag Manager, Meta Pixel, Google Search Console, Canva, Google Workspace, MS Office, Google Classroom, Zoom, Microsoft Teams"),
        ("Additional Programming", "C, C++, Java; PHP (basic reading and modification)"),
    ]
    for label, values in skills:
        story.append(Paragraph(f"<b>{label}:</b> {escape(values)}", styles["skill"]))

    add_section(story, "Selected Projects", styles)
    for project in projects:
        title = f"{escape(project['title'])} | {escape(project['technologies'])}"
        desc = escape(project["description"])
        story.append(KeepTogether([
            Paragraph(title, styles["project_title"]),
            Paragraph(desc, styles["project_desc"]),
            Paragraph(linked(project["url"], "View source repository"), styles["project_link"]),
        ]))

    # Page 2: professional experience and remaining sections.
    story.append(PageBreak())
    add_section(story, "Professional Experience", styles)
    experiences = [
        ("IT Coordinator | Computer Teacher | O-Level Physics Guest Lecturer", "Jun 2025 – Present", "Mount Royal Academy — Narayanganj, Bangladesh", [
            "Support day-to-day school IT infrastructure and technology operations.",
            "Teach computer/ICT concepts to students in Grades 3–7.",
            "Deliver guest instruction in O-Level Physics."]),
        ("Proxy ICT Teacher", "Apr 2025 – May 2025", "Heritage School — Narayanganj, Bangladesh", [
            "Covered ICT classes during regular teachers’ absences and maintained continuity with planned lessons.",
            "Led classroom technology activities and supported student learning."]),
        ("Digital Marketer (Remote)", "Oct 2024 – Jan 2025", "Edupy Academy — Dhaka, Bangladesh", [
            "Supported digital visibility, social-media outreach, and promotional content across online channels."]),
        ("IT Associate (Hybrid)", "Jan 2023 – Sep 2024", "CNBDEXIM — Dhaka, Bangladesh", [
            "Maintained day-to-day IT systems and assisted with hardware support and network troubleshooting.",
            "Provided on-site and remote technical assistance for business operations."]),
        ("IT Consultant (Remote)", "Aug 2022 – Oct 2024", "Digital Fire Safety Solution Ltd — Dhaka, Bangladesh", [
            "Provided remote technical consulting and troubleshooting for operational IT issues.",
            "Reviewed IT needs and recommended practical improvements to system reliability and efficiency."]),
        ("AI Engineer Intern (Remote)", "Aug 2022 – Jan 2023", "Teachnook — India", [
            "Participated in AI/ML learning and project activities involving model-building, training, and testing workflows.",
            "Completed a cancer-prediction learning exercise using a Kaggle dataset and tools including Weka, Excel, and Google Colab."]),
    ]
    for role, period, org, bullets in experiences:
        story.append(Paragraph(f"{escape(role)}  <font name='Times-Italic' size='7.6'>|  {escape(period)}</font>", styles["role"]))
        story.append(Paragraph(escape(org), styles["org"]))
        for bullet in bullets:
            story.append(Paragraph("•  " + escape(bullet), styles["bullet"]))

    add_section(story, "Education", styles)
    education = [
        ("B.Sc. in Computer Science and Engineering", "2019 – 2023", "American International University-Bangladesh (AIUB) — CGPA: 3.83/4.00; completed in 3 years"),
        ("Higher Secondary Certificate (Science)", "2017 – 2019", "Government Tolaram College — GPA: 3.92/5.00"),
        ("Secondary School Certificate (Science)", "2014 – 2017", "Narayanganj High & College — GPA: 5.00/5.00"),
    ]
    for title, period, details in education:
        story.append(Paragraph(f"<b>{escape(title)}</b>  |  {escape(period)}", styles["normal"]))
        story.append(Paragraph(escape(details), styles["normal"]))

    add_section(story, "Private Tutoring Experience", styles)
    for line in [
        "Private Tutor — O-Level / Edexcel (Jun 2026) — Physics, ICT, Computer Science, Mathematics B, Further Pure Mathematics",
        "Private Tutor — HSC Candidate (Science) (Oct 2024) — ICT, English, Bengali",
        "Private Tutor — SSC Candidate (Arts) (Jan 2023) — ICT, English, General Mathematics, General Science",
        "Private Tutor — SSC Candidate (Science) (Jan 2023) — Physics, Chemistry, Higher Mathematics, Biology",
    ]:
        story.append(Paragraph(escape(line), styles["normal"]))

    add_section(story, "Certifications & Professional Development", styles)
    for line in [
        "Operating System — Coursera  |  Verify credential",
        "AI for Everyone — Coursera  |  Verify credential",
        "Python for Everybody — Coursera Specialization  |  Verify credential",
        "IT Fundamentals for Cybersecurity — Coursera Specialization  |  Verify credential",
        "MS Excel: Beginner to Advanced  |  Verify credential",
        "MS PowerPoint Advanced Course  |  Verify credential",
        "Professional Digital Marketing (A+) — Creative IT  |  Verify credential",
        "Digital Marketing Business Workshop  |  Verify credential",
    ]:
        story.append(Paragraph("•  " + escape(line), styles["normal"]))

    add_section(story, "Languages", styles)
    story.append(Paragraph("Bengali (native)  |  English  |  Hindi", styles["normal"]))

    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(f"Generated {PDF_PATH} with {len(projects)} selected projects.")


if __name__ == "__main__":
    main()
