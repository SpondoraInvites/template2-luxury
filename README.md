# Ivory Botanical — Luxury Wedding Invitation Template

Tier: **Luxury (৳5,990)** · Cinematic single-page digital invitation.
Everything in the Signature tier, plus the Luxury upgrades.

A soft, light **ivory-garden** design — warm cream paper, dusty rose and
antique gold, Mughal arches, kantha-stitch dividers and a water-lily
monogram crest. The invitation opens with **champagne velvet curtains**
parting to reveal the page, **flowing petals** drift down the whole site,
and the couple's names are set in a flowing script with a hand-scribbled
flourish that draws itself in **both English and Bangla**.

Fully bilingual (EN ⇄ বাংলা) with automatic Bangla digits, live
countdown, scroll-drawn story timeline, arched event cards with maps +
add-to-calendar, an arched photo gallery with lightbox, **config-driven
custom sections** (quote bands, card grids, FAQs), background music,
RSVP via WhatsApp or a form endpoint, and a still version for guests
who ask for reduced motion.

## Included in this tier

Everything from Signature (৳3,990):

- Couple names + water-lily monogram crest, wedding date + live countdown
- Family / welcome message, Our Story timeline
- Multiple event cards with Google Maps + Add-to-Calendar
- Photo gallery with fullscreen lightbox (keyboard + swipe)
- Venue with embedded map + directions
- RSVP (WhatsApp and/or Formspree-style endpoint)
- Background music, shareable link, mobile-first + full desktop layout

Luxury additions:

- **Curtain opening** — champagne velvet drapes with a scalloped gold
  valance part to reveal the invitation; the tap that opens them also
  starts the music (browsers require a tap before audio). Set
  `intro.enabled: false` to land straight on the hero,
  `intro.oncePerSession: true` to greet each guest only once per browser
  session. A Skip button (and Escape) jumps straight to the site.
  `motion: "honor"` skips it automatically for guests whose device asks
  for reduced motion.
- **Flowing petals** — blush, gold and cream petals drift across the
  whole page on a whisper of wind (shiuli-blossom buds, petal pairs and
  tiny florets, drawn on a lightweight canvas). `petals: false` turns
  them off.
- **Scribbly names** — the couple's names render in a flowing script
  (Imperial Script in English, Galada in Bangla) with a two-pass
  hand-scribbled underline that draws itself as the names appear.
- **Premium light design** — ivory & cream palette, dusty rose and
  antique gold, Mughal-arch cards/tiles/gallery frames, kantha-stitch
  dashed dividers, botanical hero sprays, water-lily crest
- **Advanced animations** — hero cascade, settling countdown digits,
  scroll-drawn story rail, chapter spotlight, staggered reveals,
  ken-burns-style lightbox fades, scroll progress bar
- **Custom sections** — any number of extra sections from four layouts
  (`quote`, `text`, `cards`, `faq`), defined purely in config (see
  `customSections` below). Samples included: a Qur'an quote band, a
  Dress Code card grid with colour swatches, and a Good-to-Know FAQ
  accordion
- **Priority delivery, 3–4 revisions** — position this tier to clients
  accordingly

Not in this tier (reserved for Bespoke ৳7,990+): fully custom concept &
artwork, bespoke illustration/animation, multi-page experiences.

## Files

| File         | Purpose                                          |
|--------------|--------------------------------------------------|
| `index.html` | Page structure. Rarely needs editing.            |
| `styles.css` | All styling + design tokens at the top.          |
| `config.js`  | **Every client-specific value lives here.**      |
| `script.js`  | i18n, curtains, petals, countdown, gallery, RSVP, music. |
| `assets/photos/` | Gallery images (placeholder art included).   |
| `assets/music/theme.mp3` | Placeholder track — swap for the client's song. |

## Customising for a client

Edit **`config.js` only** — motion, intro, petals, names, blessing,
date, families, story chapters, events, venue, photos, custom sections,
music, RSVP destination, closing line and studio credit. Every field is
commented.

Fields that need small care:

- `weddingDateTime` — ISO format with timezone, e.g.
  `"2027-02-12T18:00:00+06:00"`. Drives the countdown.
- Each event's `mapQuery` — paste the venue name exactly as Google Maps
  knows it (or `23.7936,90.4043` style coordinates) so the map pins
  correctly.
- `gallery.photos[].src` — drop webp/jpg files into `assets/photos/`
  (~1200px wide is plenty) and list them. `wide: true` spans two
  columns.
- `rsvp.whatsapp` — international format, digits only, no `+`
  (e.g. `8801712345678`). Set `rsvp.endpoint` to a Formspree URL to
  POST answers there instead/additionally.
- `music.src` — replace `assets/music/theme.mp3` with the client's song
  (mp3, ideally ≤2 MB). The current file is a soft generated ambient
  piano loop (placeholder only).

## Languages (English / বাংলা)

A floating **EN / বাং** toggle sits top-right. First-time visitors whose
browser language starts with "bn" get Bangla automatically. The choice
is remembered in `localStorage`, and restored before first paint so
Bangla readers never see a flash of English.

- Client content is localised via the `bn:` block in `config.js`.
  Objects merge over the English values key by key — anything omitted
  falls back to English. Arrays (events, photos, chapters, custom
  sections) replace wholesale. **Delete the whole `bn` block to hide
  the toggle and ship an English-only invite.**
- UI chrome (countdown labels, section titles, RSVP form, buttons,
  lightbox, share text) is translated in `script.js` (`UI.en` / `UI.bn`).
- In Bangla mode, generated numerals (countdown, footer date, guest
  count) render as Bangla digits (০–৯) automatically. Write dates,
  times and addresses in the `bn:` block with Bangla digits directly.
- Typography swaps automatically: **Galada** takes the couple's names,
  **Tiro Bangla** the serif, **Anek Bangla** the sans — with Latin
  letter-tracking softened so Bengali glyphs breathe. The scribble
  flourish adapts to both scripts.

## Motion

`motion: "always"` (default) plays the full cinematic experience for
everyone. `motion: "honor"` gives guests whose device requests reduced
motion a still, instant version: no curtains, no petals, no scroll
effects — everything readable immediately.

## Design tokens

The palette and type live in `:root` at the top of `styles.css`
(`--cream`, `--rose`, `--gold`, `--sage`, `--ink`, plus the font
stacks). Tweak there for a client who wants a shifted accent — every
arch, stitch line and glow re-tints from those tokens.

Fonts (loaded from Google Fonts in `index.html`):
Playfair Display (display serif), Imperial Script (names script),
Jost (sans), Galada + Tiro Bangla + Anek Bangla (Bangla).

Placeholder gallery art in `assets/photos/` is SVG artwork in the same
palette — replace with the couple's real photos for delivery.
