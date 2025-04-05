import type { Config } from 'tailwindcss'
import { colors } from './src/commons/colors'
const config: Config = {
	theme: {
		extend: {
			spacing: {
				app: '100px',
				50: '50px',
			},
			lineHeight: {
				full: '100%',
			},
			animate: {
				'fly-in': 'fly-in 0.3s ease-out forwards',
			},
			keyframes: {
				'fly-in': {
					'0%': { transform: 'translateY(16px)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 },
				},
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
