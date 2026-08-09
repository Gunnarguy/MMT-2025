# MMT-2025

Trip guides for Mom's road trips. The live site is the **Michigan '26 Field
Guide** — Palatine, Illinois to the Straits of Mackinac and back by way of
Ontario, September 14–21, 2026.

**→ https://gunnarhostetler.github.io/MMT-2025/**

```
Trip to Michigan (2026 source).docx   Mom's planning document — the authority on intent
trip-planner/                         The app (React + Vite, deployed to GitHub Pages)
archive/
├── michigan-draft-2025/              The earlier "Girls Trip to Michigan" draft
└── new-england-2025/                 The 2025 New England trip that came before it
```

The app lives in [`trip-planner/`](trip-planner/) — see
[its README](trip-planner/README.md) for how it's built and why it deliberately
has no backend.

## Deploying

Pushing to `main` builds and publishes automatically via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). No secrets
required.

## The archive

`archive/` holds the source documents and generated output from the two earlier
versions of this trip. Nothing in the live app reads from it; it's kept because
the planning history is worth having.
