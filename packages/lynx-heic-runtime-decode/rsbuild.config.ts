import { defineConfig } from '@rsbuild/core';

export default defineConfig({
  source: {
    entry: {
      main: './shell/index.ts',
    },
  },
  output: {
    distPath: {
      root: './www',
    },
  },
  server: {
    publicDir: [{
      name: './dist',
      copyOnBuild: true,
    }],
  },
});
