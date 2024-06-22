import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [
		// Visibility, z-index, and cursor
		{
			pattern: /visibility|z-index|cursor/,
			variants: ['hover']
		},

		// Sizing
		{
			pattern: /w-.+/,
			variants: ['hover']
		},
		{
			pattern: /h-.+/,
			variants: ['hover']
		},
		{
			pattern: /size-.+/,
			variants: ['hover']
		},

		// Backgrounds
		{
			pattern: /bg-.+/,
			variants: ['hover']
		},

		// Borders
		{
			pattern: /rounded-.+/,
			variants: ['hover']
		},
		{
			pattern: /border-.+/,
			variants: ['hover']
		},

		// Effects
		{
			pattern: /shadow-.+/,
			variants: ['hover']
		},

		// Transitions & Animations
		{
			pattern: /transition-.+/,
			variants: ['hover']
		},
		{
			pattern: /duration-.+/,
			variants: ['hover']
		},
		{
			pattern: /ease-.+/,
			variants: ['hover']
		},
		{
			pattern: /delay-.+/,
			variants: ['hover']
		},
		{
			pattern: /animate-.+/,
			variants: ['hover']
		},

		// Transforms
		{
			pattern: /scale-.+/,
			variants: ['hover']
		},
		{
			pattern: /rotate-.+/,
			variants: ['hover']
		},
		{
			pattern: /translate-.+/,
			variants: ['hover']
		},
		{
			pattern: /skew-.+/,
			variants: ['hover']
		},
		{
			pattern: /origin-.+/,
			variants: ['hover']
		}
	],

	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	}
};

export default config;
