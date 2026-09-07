import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';

export default defineConfig({
  base: './',
  plugins: [{
    name: 'prompt-index',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'index.json', source: readFileSync('index.json', 'utf8') });
    },
  }],
});
