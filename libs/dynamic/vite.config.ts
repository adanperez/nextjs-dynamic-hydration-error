import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { nodeExternals } from 'rollup-plugin-node-externals';

// https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['src'] })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: 'src'
      },
      plugins: [
        nodeExternals(),
      ]
    },
  },
});
