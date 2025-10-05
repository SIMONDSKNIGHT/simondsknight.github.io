---
layout: project
title: Portfolio Website
summary: Functional, lightweight portfolio with fast navigation, accessible modals, and clean typography—built to showcase projects better than a repo list.
year: 2025
stack: [Jekyll, JS, HTML, CSS]
thumb: /assets/img/website-thumb.jpg     # card image
hero:  /assets/img/website-hero.jpg      # big still (fallback)
#gif:   /assets/gif/website.gif           # animated demo (optional)
png: true
links:
  - { label: "Repo", url: "https://github.com/simondsknight/simondsknight.github.io" } # update if different
  # - { label: "Live", url: "https://<your-domain>" }
---

## Overview

A minimal, fast, and fully client-side portfolio. Projects are authored as Markdown with front-matter, rendered into a responsive grid of cards; each card opens a smooth, animated modal with details, media, and links. The site focuses on **clarity**, **speed**, and **zero-dependency** ergonomics.

## Implementation

- **Static site (Jekyll):** pages/projects written in Markdown; front-matter drives cards (title, year, stack, images).
- **Project cards:** semantic HTML + CSS grid; square aspect ratio, hover lift, and muted metadata.
- **Modal system:** vanilla JS with `<template>` injection; opens via `data-target` on the card.  
  - Fades in/out via `opacity` + `visibility`; panel uses a small `translateY` for perceived smoothness.  
  - Hash deep-linking (`#p=slug`) restores the correct modal on refresh/direct link.  
  - Keyboard support: `Escape` to close; click-scrim and close-button handlers delegated.
- **Design tokens:** custom properties (`--bg`, `--fg`, `--muted`, `--surface`, `--border`, `--w`) for theme + layout.
- **Theming:** `prefers-color-scheme: dark` overrides tokens for a true dark mode.
- **Layout:** sticky header, fixed footer, and a scroll spacer pseudo-element to avoid footer overlap.
- **Images:** `object-fit: cover` for card thumbs; full-bleed hero/gif inside modal with `max-height` containment.
- **Progressive enhancement:** site works as plain links; JS augments with modals and history updates.
- **Build & deploy:** standard Jekyll build; suitable for GitHub Pages or any static host.

## Notes

- **Accessibility:** focus-visible skip link, logical heading structure, `aria-hidden` on modal host, and reduced-motion fallback.
- **Performance:** no frameworks, no client-side routing; animations use compositor-friendly properties only.
- **Maintainability:** add a project by dropping a `.md` with front-matter (title/summary/stack/thumb/hero/gif/links).  
- **Extensibility:** supports additional links (Demo, Paper, Talk), per-project image sets, and alternate modal layouts if needed.
