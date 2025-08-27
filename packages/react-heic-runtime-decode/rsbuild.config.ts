import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';

export default defineConfig({
  plugins: [pluginReact(), pluginNodePolyfill()],
  // load *.heic files as resources
  source: {
    assetsInclude: [/\.heic$/],
    entry: {
      main: './src/index.tsx',
    },
  },
  server: {
    port: 3001,
  },
  output: {
    distPath: {
      root: '../../docs/react',
    },
    assetPrefix: 'auto'
  }
});
