# AI Book Recommender

A Domo Custom App that recommends books using Domo's AI Service Layer. The user picks favorite books (searched live against [Open Library](https://openlibrary.org/)), genre, mood, and length; a structured system prompt drives the `/domo/ai/v1/text/generation` endpoint to return four JSON-formatted recommendations.

This repo is the companion sample for the **[AI Book Recommender tutorial](https://domo.com/docs/portal/Apps/App-Framework/Tutorials/React/AI-Book-Recommender)**.

## What it demonstrates

- Scaffolding a Vite + React + TypeScript app with the [DA CLI](https://domo.com/docs/portal/Apps/App-Framework/Tools/da-cli)
- Debounced public-API search against Open Library
- Calling Domo's AI text generation endpoint with `promptTemplate` + `system` + `outputWordLength`
- Forcing structured JSON output with a strict system prompt (and a regex strip for fenced output)
- Building a polished [Ant Design](https://ant.design/) form and results view

## Project layout

```
src/
├── main.tsx                       # App entry
├── index.scss
└── components/
    └── App/
        ├── App.tsx                # All state, prompts, API calls, and UI
        └── App.module.scss
public/
└── static/
    ├── bookshelf.jpeg             # Full-bleed background
    └── chapter_divider.png        # Heading divider
```

## Prerequisites

- Node 18+
- The [DA CLI](https://www.npmjs.com/package/@domoinc/da) and the [Domo CLI](https://domo.com/docs/portal/Apps/App-Framework/Quickstart/Setup-and-Installation)
- `domo login` completed against your target instance
- Access to the Domo AI Service Layer on your instance

## Getting started

1. Publish a skeleton to get a `proxyId` (required for authenticated Domo API calls):

   ```bash
   pnpm install
   pnpm upload
   ```

2. Create a card on the published design (no dataset needed — the card just exists to generate a `proxyId`) and copy the `id` + `proxyId` back into `public/manifest.json`.
3. Run locally:

   ```bash
   pnpm start
   ```

See the [tutorial](https://domo.com/docs/portal/Apps/App-Framework/Tutorials/React/AI-Book-Recommender) for the full walk-through, including the prompt design.

## Scripts

| Command          | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `pnpm start`     | Vite dev server with the Domo proxy                   |
| `pnpm build`     | Lint, test, and build for production                  |
| `pnpm upload`    | Build and `domo publish` in one step                  |
| `pnpm generate`  | Scaffold new components / reducers with `da generate` |
| `pnpm test`      | Run Vitest                                            |
| `pnpm storybook` | Launch Storybook                                      |
