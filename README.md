# MCAT Study OS

A mobile-first MCAT study planner, knowledge map, practice, and error-review PWA.

## Local Development

```bash
npm install
npm run start -- --port 5173
```

Open:

```text
http://127.0.0.1:5173/
```

For same-network iPhone testing, open the LAN URL shown in the app settings page.

## Build

```bash
npm run build
```

The production files are generated into `dist/`.

## GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.

1. Push the project to GitHub on the `main` branch.
2. In the GitHub repo, open Settings -> Pages.
3. Set the source to GitHub Actions.
4. Push to `main` or run the workflow manually.

The workflow builds with `GITHUB_PAGES=true`, so Vite uses the `/Codex-MCAT/` base path for GitHub Pages project hosting.

If you rename the GitHub repository, update `repoName` in `vite.config.js`.
