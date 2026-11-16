import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  plugins: [{
    name: 'shadcn-license',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'assets/SHADCN-LICENSE.txt', source: readFileSync('assets/SHADCN-LICENSE.txt') });
    },
  }],
});
