import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [
      { find: '@src', replacement: resolve(__dirname, 'src') },
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: '@layouts', replacement: resolve(__dirname, 'src/layouts') },
      { find: '@recoil', replacement: resolve(__dirname, 'src/recoil') },
      { find: '@assets', replacement: resolve(__dirname, 'src/assets') },
    ],
  },
})
