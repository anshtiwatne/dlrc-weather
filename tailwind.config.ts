import type { Config } from 'tailwindcss'
import { heroui } from '@heroui/theme'

const config: Config = {
	content: [
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)'],
				mono: ['var(--font-geist-mono)'],
			},
		},
	},
	darkMode: 'class',
	plugins: [heroui()],
}

export default config
