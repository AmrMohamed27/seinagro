# Never build into the dev server's `.next`

Running `next build` / `npm run build` while `next dev` is running corrupts `.next/`
(`Cannot find module './NNN.js'`, missing `routes-manifest.json`, `/ar` returns 500).

- To check types: `npm run typecheck`.
- To validate a production build: `npm run build:check` (outputs to `.next-build`).
- Never delete `.next` while the dev server is running; use `npm run clean` after stopping it.
