#!/usr/bin/env python3
"""Check (and with --fix, fill) card metadata: creator, source, notes.

Rules:
  data.creator          = "Hornysilicon"
  data.extensions.source = the card's GitHub Pages URL
                          (https://hornysilicon.github.io/silly-cards/card.html?id=<id>)
  data.creator_notes (mirrored to top-level `creatorcomment`) =
      existing page HTML for detail:'notes' cards (left untouched),
      otherwise the chub-style header HTML pointing at the card's page.

With no file arguments, checks cards changed vs origin/main plus staged files.
Exit 1 if anything is missing (after fixing, when --fix).
"""
import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
PAGES = "https://hornysilicon.github.io/silly-cards/card.html"
CREATOR = "Hornysilicon"


def changed_cards():
    try:
        vs_main = subprocess.run(
            ["git", "diff", "--name-only", "--diff-filter=ACMR", "origin/main...HEAD"],
            capture_output=True, text=True, cwd=REPO).stdout.splitlines()
    except Exception:
        vs_main = []
    staged = subprocess.run(
        ["git", "diff", "--name-only", "--diff-filter=ACMR", "--cached"],
        capture_output=True, text=True, cwd=REPO).stdout.splitlines()
    skip = ("chub/", "docs/", "presets/", ".opencode/")
    files = {f for f in vs_main + staged
             if f.endswith(".json")
             and not any(p in f for p in skip)
             and "backup" not in f}
    return sorted(REPO / f for f in files if (REPO / f).exists())


def site_entries():
    """Parse docs/data.js -> {basename: {id, detail}} (file may be 'succubi/X.json')."""
    text = (REPO / "docs" / "data.js").read_text(encoding="utf-8")
    entries = {}
    for block in re.findall(r"\{\s*id:\s*'([^']+)'(.*?)\n  \},", text, re.S):
        card_id, body = block
        m = re.search(r"file:\s*'([^']+)'", body)
        if m:
            entries[m.group(1).split("/")[-1]] = {
                "id": card_id,
                "detail": "notes" if re.search(r"detail:\s*'notes'", body) else None,
            }
    return entries


def header_html(card_id):
    return (f'<p><b>This is the Chub version of this bot, download the ST version '
            f'<a href="{PAGES}?id={card_id}">here</a></b></p>')


def check_card(path, entry, fix):
    problems = []
    card = json.loads(path.read_text(encoding="utf-8"))
    d = card.get("data", card)
    ext = d.setdefault("extensions", {})

    if d.get("creator") != CREATOR:
        problems.append(f"creator={d.get('creator')!r}")
        if fix:
            d["creator"] = CREATOR

    if entry:
        url = f"{PAGES}?id={entry['id']}"
        if ext.get("source") != url:
            problems.append(f"source={ext.get('source')!r}")
            if fix:
                ext["source"] = url
        notes = d.get("creator_notes") or card.get("creatorcomment") or ""
        if not notes.strip():
            problems.append("creator_notes empty")
            if fix:
                notes = header_html(entry["id"]) if not entry["detail"] else notes
                if not notes:
                    problems.append("  (detail:'notes' card has no page HTML to use)")
                else:
                    d["creator_notes"] = notes
                    card["creatorcomment"] = notes
    else:
        problems.append("no docs/data.js entry (cannot derive id)")

    if problems and fix:
        # preserve each export's style: single-line files stay single-line
        single = "\n" not in path.read_text(encoding="utf-8").strip()
        if single:
            dump = json.dumps(card, ensure_ascii=False, separators=(",", ":"))
        else:
            dump = json.dumps(card, indent=4, ensure_ascii=False) + "\n"
        path.write_text(dump, encoding="utf-8")
    return problems


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="*", help="card json files (default: changed vs origin/main + staged)")
    ap.add_argument("--fix", action="store_true")
    args = ap.parse_args()

    paths = [Path(f) for f in args.files] or changed_cards()
    if not paths:
        print("No changed cards found.")
        return
    entries = site_entries()

    failed = False
    for p in paths:
        try:
            problems = check_card(p, entries.get(p.name), args.fix)
        except json.JSONDecodeError as e:
            print(f"INVALID JSON  {p.name}: {e}")
            failed = True
            continue
        if problems:
            failed = True
            print(f"{'fixed' if args.fix else 'MISSING'}  {p.name}: " + "; ".join(problems))
        else:
            print(f"ok  {p.name}")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
