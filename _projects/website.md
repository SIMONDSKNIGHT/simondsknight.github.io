---
layout: project
title: Portfolio Website
summary: Functional, lightweight portfolio with fast navigation, accessible modals, and clean typography—built to showcase projects better than repo list.
year: 2025
stack: [Jekyll, JS, HTML, CSS]
thumb: /assets/img/website-thumb.jpg     # card image
#hero:  /assets/img/website-hero.jpg      # big still (fallback)
#gif:   /assets/gif/website.gif           # animated demo (optional)
png: true
links:
  - { label: "Repo", url: "https://github.com/simondsknight/simondsknight.github.io" } 
  # - { label: "Live", url: "https://<your-domain>" }
---

## Overview

A minimal, fast, and fully client-side portfolio. Projects are authored as Markdown with front-matter and rendered into a responsive grid of cards; simple animation add to basic web personality . The site focuses on clarity and on zero reliance on frameworks.

## Implementation

- **Static site (Jekyll):** pages/projects written in Markdown; front-matter drives cards (title, year, stack, images).
- **Modal system:** vanilla JS with `<template>` injection; opens via `data-target` on the card.  
  - uses opacity for subtle fade-in
  - Hash deep-linking (`#p=slug`) restores the correct modal on refresh/direct link.  
  - Keyboard support: `Escape` to close; click-scrim and close-button handlers delegated.
- **Design tokens:** custom properties (`--bg`, `--fg`, `--muted`, `--surface`, `--border`, `--w`) for theme + layout.
- **Theming:** dark mode theming.
- **Layout:** sticky header, fixed footer, and a scroll spacer pseudo-element to avoid footer overlap.
- **Multi-Platform** care given to allow for comfortable use across different platforms.
- **Images:** `object-fit: cover` for card thumbs.
- **Progressive enhancement:** site works as plain links; JS augments with modals and history updates.
- **Build & deploy:** standard Jekyll build; Ensures ability to host on github pages, saving on deployment costs.

## Notes

- **Accessibility:** Basic and easy to follow structure ensures that there is no possibility of error in use.
- **Performance:** no frameworks, no client-side routing. animations use compositor-friendly properties only.
- **Maintainability:** add a project by dropping a `.md` with front-matter (title/summary/stack/thumb/hero/gif/links).  
- **Extensibility:** supports additional links (Demo, Paper, Talk), Example provided in currently unused Blog section of the project
