import { defineConfig } from '@lynx-js/rspeedy';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin';
export default defineConfig({
  plugins: [pluginReactLynx(), pluginNodePolyfill()],
  source: {
    entry: './src/index.tsx',
    assetsInclude: [/\.heic$/],
  },
  output: {
    assetPrefix: 'http://localhost:3000/',
  },
  environments: {
    web: {},
  },
});
