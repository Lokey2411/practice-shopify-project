import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	server: {
		port: 3000,
		proxy: {
			'/services/api': {
				target: 'https://be-kappa-sand.vercel.app',
				changeOrigin: true,
			},
		},
	},
})
