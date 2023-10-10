import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'hacienda': {
          '50': '#fafee8',
          '100': '#f2fdc4',
          '200': '#ebfc8c',
          '300': '#e5f94b',
          '400': '#e5f51a',
          '500': '#dde50d',
          '600': '#c6bc08',
          '700': '#99860a',
          '800': '#826c11',
          '900': '#6f5814',
          '950': '#413007',
        },
      }
    },
  },
  plugins: [],
}
export default config
