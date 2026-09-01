# AGENTS.md

Repo of SillyTavern character/scenario cards (root) and presets (`presets/`), plus a static GitHub Pages site in `docs/`.

## When adding or updating a card/preset

The README and the site are maintained **by hand** — nothing is generated automatically. A change to the JSON files alone will NOT appear anywhere users look. For every new or meaningfully changed card/preset, update ALL of:

1. **`README.md`** — add/refresh the entry. Cards are ordered most- to least-recent (newest at top); presets go under the `## Presets` section.
2. **`docs/data.js`** — the site is static and renders only what's in the `CARDS` / `PRESETS` arrays. Add the matching entry there too (newest first). See existing entries for the fields; `blurb`/`notes` are HTML-escaped strings, links use raw HTML `<a>` tags. The download button links to the raw file on `main`, so entries only work after commit + push.

When documenting a preset change, diff it against the related/similarly-named preset and note the actual differences — don't guess.

## Conventions

- Card/preset JSONs are SillyTavern exports; don't reformat or reorder keys.
- `docs/assets/images/<card-id>/` holds the site art; `images/` (repo root) holds card-embedded art.
- Never commit the `.backup` files.
