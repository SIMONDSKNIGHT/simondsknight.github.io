---
# The layout to render this project with (the template we made above).
layout: project

# The human-readable project name shown on the page and on the homepage list.
title: Messaging Gateway

# A short one-liner used on the homepage list (optional but recommended).
summary: High-throughput service bridging Kafka ↔ REST with idempotency and back-pressure.

# Used for sorting and quick glance on the homepage (optional).
year: 2025

# Your role on the project (optional).
role: Lead Engineer

# Array of technologies; displayed as a neat comma-separated list.
stack: [Java, Spring Boot, Kafka, Redis, Docker]

# Links let readers jump to code, docs, or a live demo.
links:
  - {label: Repo,   url: "https://github.com/you/messaging-gateway"}
  - {label: README, url: "https://github.com/you/messaging-gateway#readme"}

# Bulleted highlights appear near the bottom. Keep these measurable when possible.
highlights:
  - Sustained 50k msgs/sec with exactly-once semantics
  - Pluggable transformers; zero-copy payload path
  - Blue/green deploys via canary + health gates
---

## Problem
Briefly state the business/technical problem and constraints.
(Why did this need to exist? What was hard about it?)

## Approach
Outline the architecture and key trade-offs.
(What did you build? Why this design instead of alternatives?)

## Outcome
Numbers and impact: latency/throughput/error rates, cost reductions, incidents avoided, adoption, etc.
