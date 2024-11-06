import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tsconfigPaths()],
  resolve: {
		alias: [
			{ find: "assets", replacement: resolve(__dirname, "src/assets") },
			{	find: "components", replacement: resolve(__dirname, "src/components") },
			{ find: "pages",	replacement: resolve(__dirname, "src/pages") },
		],
	},
})
