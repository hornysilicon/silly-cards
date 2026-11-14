#!/usr/bin/env python3
"""Check (and with --fix, fill) card metadata: creator, source, notes.

Rules:
  data.creator           = "Hornysilicon"
  data.extensions.source = the card's GitHub Pages URL
                           (https://hornysilicon.github.io/silly-cards/card.html?id=<id>)
  data.creator_notes (mirrored to top-level `creatorcomment`) =
      the card's page HTML (site style, inline CSS, images via raw.githubusercontent),
      generated from its docs/data.js entry. Cards with detail:'notes' keep their
      hand-made page HTML untouched. A creator_notes that is exactly the old,
      wrongly-injected Chub header is replaced by the generated page HTML.

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
SITE = "https://hornysilicon.github.io/silly-cards"
RAW = "https://raw.githubusercontent.com/hornysilicon/silly-cards/main"
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
    """Parse docs/data.js -> {basename: {id, detail, ...fields for page HTML}}."""
    text = (REPO / "docs" / "data.js").read_text(encoding="utf-8")
    entries = {}
    for block in re.findall(r"\{\s*id:\s*'([^']+)'(.*?)\n  \},", text, re.S):
        card_id, body = block
        fields = dict(_js_strings(body))
        m = re.search(r"file:\s*'([^']+)'", body)
        if not m:
            continue
        chars = []
        cm = re.search(r"characters:\s*\[(.*?)\]\s*\n", body, re.S)
        if cm:
            for obj in re.findall(r"\{([^{}]*)\}", cm.group(1)):
                ch = dict(_js_strings("{" + obj + "}"))
                if ch.get("name"):
                    chars.append(ch)
        entries[m.group(1).split("/")[-1]] = {
            "id": card_id,
            "detail": "notes" if re.search(r"detail:\s*'notes'", body) else None,
            "fields": fields,
            "characters": chars,
        }
    return entries


JS_STR_RE = re.compile(r"(\w+)\s*:\s*('(?:\\.|[^'\\])*'|\"(?:\\.|[^\"\\])*\")")
ESC = {"n": "\n", "t": "\t", "r": "\r", "'": "'", '"': '"', "\\": "\\", "/": "/"}


def _js_unescape(s):
    out, i = [], 0
    while i < len(s):
        c = s[i]
        if c == "\\" and i + 1 < len(s):
            n = s[i + 1]
            if n == "u" and i + 5 < len(s):
                out.append(chr(int(s[i + 2:i + 6], 16)))
                i += 6
                continue
            out.append(ESC.get(n, n))
            i += 2
        else:
            out.append(c)
            i += 1
    return "".join(out)


def _js_strings(text):
    for m in JS_STR_RE.finditer(text):
        yield m.group(1), _js_unescape(m.group(2)[1:-1])


def old_chub_header(card_id):
    return (f'<p><b>This is the Chub version of this bot, download the ST version '
            f'<a href="{PAGES}?id={card_id}">here</a></b></p>')


STYLE = (
    "max-width:780px;margin:0 auto;background:#0f0b09;"
    "border-top:3px solid #c4553a;border-bottom:1px solid #2c211d;"
    "padding:46px 30px 54px;color:#dbcbbc;"
    "font-family:'Cormorant Garamond',Georgia,'Palatino Linotype','Book Antiqua',serif;"
    "font-size:17px;line-height:1.65;"
)
H1 = ("margin:16px 0 0;font-family:'Cinzel',Georgia,serif;font-weight:700;"
      "font-size:clamp(34px,7vw,54px);letter-spacing:4px;line-height:1.05;color:#ead9c6;")
KICKER = ("font-family:'Cinzel',Georgia,serif;font-size:11px;letter-spacing:5px;"
          "text-transform:uppercase;color:#9b8578;")
SECT = ("display:flex;align-items:center;gap:14px;margin:36px 0 12px;"
        "font-family:'Cinzel',Georgia,serif;font-size:13px;letter-spacing:6px;"
        "text-transform:uppercase;color:#c4553a;")


def _section(title):
    return (f'<div style="{SECT}"><span style="flex:1;height:1px;background:#382823;"></span>'
            f'{title}'
            f'<span style="flex:1;height:1px;background:#382823;"></span></div>')


def page_html(entry):
    """A portable, site-styled HTML fragment for the card (for Chub imports)."""
    f = entry["fields"]
    name, tagline, blurb, notes = f.get("name"), f.get("tagline"), f.get("blurb"), f.get("notes")
    kicker = f.get("kicker") or "A character card"
    title = "The Character" if "character" in kicker.lower() else "The Scenario"
    parts = [f'<div style="{STYLE}">']
    parts.append(f'<div style="text-align:center;">'
                 f'<div style="{KICKER}">{kicker}</div>'
                 f'<h1 style="{H1}">{name}</h1></div>')
    if tagline:
        parts.append(f'<p style="text-align:center;font-style:italic;color:#9b8578;">{tagline}</p>')
    poster = f.get("poster")
    if poster:
        parts.append(f'<p style="text-align:center;margin:26px 0;">'
                     f'<img src="{RAW}/docs/{poster}" alt="{name}" '
                     f'style="max-width:100%;border:1px solid #382823;"></p>')
    if blurb:
        parts.append(_section(title))
        parts.append(f"<p>{blurb}</p>")
    if notes:
        abs_notes = notes.replace("href='lorebooks.html'", f"href='{SITE}/lorebooks.html'")
        parts.append(_section("Notes"))
        parts.append(f"<p>{abs_notes}</p>")
    for ch in entry.get("characters") or []:
        line = ch.get("line")
        if line:
            parts.append(f'<p style="border-left:3px solid #c4553a;padding-left:14px;">'
                         f'<b style="font-family:\'Cinzel\',Georgia,serif;color:#ead9c6;">'
                         f'{ch["name"]}</b> &mdash; {line}</p>')
    parts.append("</div>")
    return "\n".join(parts)


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
        notes = (d.get("creator_notes") or card.get("creatorcomment") or "").strip()
        if entry["detail"]:
            pass  # hand-made detail-page HTML, leave untouched
        elif not notes or notes == old_chub_header(entry["id"]):
            what = "creator_notes stale (old Chub header)" if notes else "creator_notes empty"
            problems.append(what)
            if fix:
                html = page_html(entry)
                d["creator_notes"] = html
                card["creatorcomment"] = html
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
