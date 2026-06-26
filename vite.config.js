import { defineConfig } from 'vite';

const repoName = 'Codex-MCAT';
const isPagesBuild = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  base: isPagesBuild ? `/${repoName}/` : '/'
});
