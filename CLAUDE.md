# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # TypeScript check + Vite production build → dist/
npm run lint      # ESLint
npm run preview   # Preview the production build locally
```

No test suite is configured.

## Architecture

Single-page React app that tokenizes text in real time using the OpenAI `tiktoken` WASM library.

**Data flow:** `App.tsx` owns all state (`text`, `encoding`, `tokens`). On every change it calls `get_encoding(enc).encode(input)` from `tiktoken`, maps each token ID to a `TokenInfo` object `{ id, text, bytes }`, then passes the array down to `TokenDisplay` and `StatsBar`.

**Key constraint — WASM:** `tiktoken` runs as WebAssembly. Two Vite plugins are required: `vite-plugin-wasm` and `vite-plugin-top-level-await`. The encoder instance must be freed after use (`encoder.free()`), which is already done in `App.tsx`.

**Token color:** `src/utils/tokenColor.ts` derives a pastel HSL color from the numeric token ID (hash-based), so the same token always gets the same color regardless of position.

**Production base URL:** `vite.config.ts` sets `base: '/tokenizer/'` in production for GitHub Pages deployment. The CI workflow (`.github/workflows/deploy.yml`) deploys to `https://jlg-formation.github.io/tokenizer/` on every push to `main`.

**UI language:** French throughout — all labels, placeholders, and messages.
