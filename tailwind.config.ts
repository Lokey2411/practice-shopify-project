import type { Config } from 'tailwindcss'
import { colors } from './src/commons/colors'
const config: Config = {
	theme: {
		extend: {
			spacing: {
				app: '100px',
			},
			lineHeight: {
				full: '100%',
			},
			colors: {
				...colors,
			},
			fontFamily: {
				Inter: ['Inter', 'sans-serif'],
				Poppins: ['Poppins', 'sans-serif'],
			},
		},
	},
	plugins: [],
}

export default config
