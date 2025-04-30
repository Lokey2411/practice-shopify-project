import { Config } from 'tailwindcss'
const config: Config = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'primary': '#1890FF',
				'input-dark': '#141414',
			},
			animation: {
				texting: 'texting 2s steps(12, end) alternate',
			},
			keyframes: {
				texting: {
					'0%': { clipPath: 'inset(0 100% 0 0)' },
					'100%': { clipPath: 'inset(0 0 0 0)' },
				},
			},
		},
	},
	plugins: [],
}
export default config
