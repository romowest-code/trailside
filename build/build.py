#!/usr/bin/env python3
"""Render the Trailside Handyman site from a template + per-page bodies.

Usage: python build/build.py
"""

import datetime
import sys
from pathlib import Path

BUILD_DIR = Path(__file__).resolve().parent
ROOT = BUILD_DIR.parent
sys.path.insert(0, str(BUILD_DIR))

from pages import PAGES  # noqa: E402


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def mark_active_nav(nav_html: str, active: str) -> str:
    """Add aria-current="page" to the nav link whose data-nav matches `active`."""
    if not active:
        return nav_html
    needle = f'data-nav="{active}"'
    return nav_html.replace(needle, f'{needle} aria-current="page"', 1)


def build():
    template = read(BUILD_DIR / "template.html")
    head_partial = read(BUILD_DIR / "components" / "head.html")
    nav_partial = read(BUILD_DIR / "components" / "nav.html")
    footer_partial = read(BUILD_DIR / "components" / "footer.html")

    year = str(datetime.date.today().year)
    footer_partial = footer_partial.replace("{{YEAR}}", year)

    for page in PAGES:
        slug = page["slug"]
        src = page["src"]
        title = page["title"]
        title_full = page.get("title_full") or f"{title} - Trailside Handyman and Remodeling"
        description = page["description"]
        nav_active = page.get("nav_active", "")

        canonical_path = "/" if slug == "" else f"/{slug}/"

        body = read(BUILD_DIR / "pages" / src)

        # Compose page-specific head
        head = (
            head_partial
            .replace("{{TITLE_FULL}}", title_full)
            .replace("{{DESCRIPTION}}", description)
            .replace("{{CANONICAL_PATH}}", canonical_path)
        )

        # Compose nav with active state
        nav = mark_active_nav(nav_partial, nav_active)

        # Compose template
        html = (
            template
            .replace("{{HEAD}}", head)
            .replace("{{NAV}}", nav)
            .replace("{{FOOTER}}", footer_partial)
            .replace("{{BODY}}", body)
            .replace("{{SLUG}}", slug if slug else "home")
        )

        # Write
        out = ROOT / "index.html" if slug == "" else ROOT / slug / "index.html"
        write(out, html)
        print(f"Built {out.relative_to(ROOT)}")


if __name__ == "__main__":
    build()
