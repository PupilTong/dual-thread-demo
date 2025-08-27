import { defineConfig } from '@rsbuild/core';

export default defineConfig({
  source: {
    entry: {
      main: './shell/index.ts',
    },
  },
  output: {
    distPath: {
      root: '../../docs/lynx',
      js: '.'
    },
    assetPrefix: 'auto'
  },
  server: {
    publicDir: [{
      name: './dist',
      copyOnBuild: true,
    }],
  },
});
