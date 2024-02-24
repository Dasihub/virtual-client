import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	mode: 'production',
	plugins: [react()],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src')
		}
	},
	server: {
		port: 3000,
		open: true,
		host: true
	},

	build: {
		rollupOptions: {
			output: {
				entryFileNames: 'js/index.js',
				assetFileNames: 'assets/[name].[ext]'
			}
		}
	}
})
