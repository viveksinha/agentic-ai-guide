---
name: website-product-ux
description: >-
  Default UX and CSS for websites you build: always light and dark theme (no
  flash), shared typography and colors across projects unless the brief overrides,
  token-based CSS, sticky table headers, accessible motion and focus. Use for any
  HTML/CSS surface — marketing, dashboards, docs, static apps — without a heavy
  framework.
---

# Website product UX and CSS (house defaults)

These rules define **how websites should look and behave by default**. Apply them on every new site unless the user or brief explicitly asks for something different (e.g. a specified design system, brand guide, or “light only”).

## House defaults (cross-site consistency)

1. **Light and dark theme** — Always ship both. User toggle + persistence (`localStorage`) + **no flash** on load (inline script in `<head>` **before** CSS sets `data-theme`). If there is no saved choice, use `matchMedia('(prefers-color-scheme: dark)')` so the first paint matches the OS; then CSS only needs `:root` (dark default) and `:root[data-theme="light"]` overrides — no duplicate `@media (prefers-color-scheme)` block required in CSS when the script always runs first.
2. **Typography** — **DM Sans** (body), **Fraunces** (headings / display), **DM Mono** (labels, badges, table headers, meta). One Google Fonts `<link>`, plus `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`. Headings: `clamp()` for scale, slight negative letter-spacing on large titles. Body line-height ~1.6–1.65; paragraphs use a **secondary** text token, not full contrast body copy.
3. **Color and theme shape** — Use **semantic CSS variables** only (`--bg`, `--surface`, `--border`, `--text`, `--text-secondary`, `--accent`, status tokens with `-bg` / `-border` pairs). Do not scatter raw hex in component rules. Keep **radius** (`--radius`, `--radius-sm`, `--radius-lg`) and **shadows** on tokens so every site feels like the same family.
4. **Layout rhythm** — Content container about **1000–1280px** max-width, horizontal padding ~24px (`1.5rem`–`2rem`), section spacing ~48–56px. Sticky top nav with bottom border and optional `backdrop-filter: blur`; give it a clear `z-index` above scrolling content.
5. **Data tables** — For any non-trivial table, **pin the header row** while the body scrolls (sticky `<thead>` inside a scrollable wrapper). When the table sits below a sticky nav or toolbar, set sticky `top` to the **combined height** of fixed UI above the table (CSS variable recommended).

---

## When to use this skill

- Building or refactoring pages with plain HTML/CSS (or scoped CSS / CSS modules).
- You need **consistent** type, color, spacing, and theme behavior **across projects**.
- You need **sticky table headers**, dense tables, or wide tables with horizontal scroll.
- You want **calm** motion, clear hierarchy, and accessible focus — without reinventing patterns each time.

---

## UX principles

1. **Clarity over decoration** — One clear primary action per view; secondary actions quieter. Gradients and heavy borders only when they carry meaning.
2. **Predictable hierarchy** — Title → supporting line → body. Eyebrows: mono, uppercase, small, accent or dim token.
3. **Calm motion** — Transitions about **120–200ms**; theme switch on `body` ~300ms for background/color. Hover on cards: slight `translateY` and stronger shadow. Respect `prefers-reduced-motion`.
4. **Readable width** — Cap long prose ~52–68ch where it matters.
5. **Accessible by default** — Contrast for text and controls; **`:focus-visible`** rings using token colors; `aria-label` / `title` on icon-only controls.

---

## CSS architecture

### Single source of truth

- **One shared stylesheet** for global tokens and shared components.
- **Page-level overrides** only in a trailing `<style>` block or scoped layer — not a second competing global file.

### Tokens

Define on `:root` (default theme) and `:root[data-theme="light"]` (or swap if you default to light). Minimum semantic set:

| Role | Examples |
|------|-----------|
| Canvas | `--bg` |
| Surfaces | `--surface`, `--surface2`, `--surface3` |
| Borders | `--border`, `--border-strong` |
| Text | `--text`, `--text-secondary`, `--text-dim` |
| Brand / links | `--accent`, `--accent-light`, `--accent-strong` |
| Status | `--green`, `--green-bg`, `--green-border` (and yellow / red / blue / gray families as needed) |
| Elevation | `--shadow-sm`, `--shadow`, `--shadow-lg` |
| Shape | `--radius`, `--radius-sm`, `--radius-lg` |
| Fonts | `--font-sans`, `--font-display`, `--font-mono` |

If you **cannot** run a head script (edge case), mirror dark/light with `@media (prefers-color-scheme: …)` on `:root:not([data-theme])` — but prefer the script so one attribute drives all tokens.

### Theme flash

```html
<script>
(function(){
  var k = 'site-theme'; /* one key per site */
  var t = localStorage.getItem(k);
  if (t !== 'light' && t !== 'dark') {
    t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', t);
})();
</script>
<link rel="stylesheet" href="…">
```

Toggle updates `data-theme`, `localStorage`, and the control’s label/icon.

---

## Sticky table headers (required pattern)

Use a **scroll container** around the table so only the body scrolls vertically; keep `<thead>` **sticky** inside that container.

```css
.table-scroll {
  overflow: auto;
  max-height: min(70vh, 36rem);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  -webkit-overflow-scrolling: touch;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead th {
  position: sticky;
  top: 0; /* set to var(--table-sticky-top) if a sticky nav sits above */
  z-index: 2;
  background: var(--surface);
  box-shadow: 0 1px 0 var(--border);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  text-align: left;
  padding: 0.5rem 0.75rem;
}

.data-table tbody td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border);
  font-size: 0.875rem;
}

.data-table tbody tr:hover td {
  background: var(--surface2);
}
```

**If** the table is below a sticky site nav of height `56px`, set `--table-sticky-top: 56px` on a wrapper and use `top: var(--table-sticky-top)` on `th`. Recompute if the nav height changes (e.g. responsive).

**Wide tables:** allow horizontal scroll on `.table-scroll`; if the first column must stay visible, use a second pattern (e.g. sticky first column with higher `z-index` on `th:first-child` / `td:first-child`) or split header/body scrollers and **sync `scrollLeft`** with a boolean lock to avoid event loops.

**Sticky bugs:** avoid `overflow: hidden` on an ancestor that should contain a sticky thead; prefer `overflow: auto` on the immediate scroll wrapper. For nested sticky (e.g. timeline headers), `overflow: clip` can behave better than `hidden` for some layouts — test in target browsers.

---

## Components (patterns)

| Pattern | Intent |
|---------|--------|
| **Primary button** | Filled surface using accent or neutral; hover: slightly darker + soft shadow + tiny lift |
| **Outline button** | Surface bg, hairline border; hover: stronger border + light shadow |
| **Card** | Border + radius; hover: stronger border + shadow + optional `translateY(-2px–3px)` for linked cards |
| **Hero** | Gradient or subtle wash (`--hero-gradient`), centered column, H1 + short paragraph + optional stats row |
| **Page header** | Breadcrumb, H1, one-line description — calmer than marketing hero |
| **Badges** | Mono, pill radius, status tint triplets (text + bg + border) |
| **Filter chips** | `.active` state; keyboard-focusable |
| **Side nav + content** | Grid layout; sticky sidebar; collapse to single column ~860px |

---

## Scroll and performance

- Use `{ passive: true }` on scroll listeners that only toggle classes or CSS variables.
- **Compact header:** after scrolling past a threshold, add a class to shrink the page header; offset threshold by any fixed bar above it.
- **Dynamic sticky `top`:** if header height changes (compact mode), recompute sticky offsets on `scroll` and `resize` (or set a CSS variable from JS).

---

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Prefer a **more granular** policy in large apps if you already have one.

---

## Agent checklist

- [ ] **Both themes** implemented; no theme flash; system preference mirrored when user has not chosen a theme.
- [ ] **House fonts** (or brief-specified fonts) wired with preconnect + one stylesheet link.
- [ ] **Only tokens** for colors, borders, shadows, radii on shared UI.
- [ ] **Tables** with sticky `<thead>` in a scroll wrapper; `top` accounts for sticky nav/toolbar.
- [ ] **`:focus-visible`** on interactive elements; contrast OK for `--text-secondary` on `--surface`.
- [ ] **Semantic HTML** — `nav`, `main`, `section`, ordered headings; buttons vs links used correctly.

---

## Anti-patterns

- Shipping **light-only** or **dark-only** without an explicit brief exception.
- Raw colors in component CSS instead of variables.
- Theme script **after** main CSS (causes flash).
- Table header not sticky on long datasets.
- Removing focus outlines with no replacement.

---

## Companion file

`tokens-starter.css` in this folder — semantic tokens, dark default on `:root` and light on `:root[data-theme="light"]`, plus font-family variables for the house stack. Extend with your accent or rename the `localStorage` key in your own head script.

---

## Where to install (Cursor)

```text
.cursor/skills/website-product-ux/SKILL.md
.cursor/skills/website-product-ux/tokens-starter.css
```

Reload the editor if the skill does not appear. For other tools, place the same files where that tool expects skills.
