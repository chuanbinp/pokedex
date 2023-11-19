/** @type {import('tailwindcss').Config} */

const customColors = [
  '#A8A77A',
  '#EE8130',
  '#6390F0',
  '#F7D02C',
  '#7AC74C',
  '#96D9D6',
  '#C22E28',
  '#A33EA1',
  '#E2BF65',
  '#A98FF3',
  '#F95587',
  '#A6B91A',
  '#B6A136',
  '#735797',
  '#6F35FC',
  '#705746',
  '#B7B7CE',
  '#D685AD',
]

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  safelist: [
    ...customColors.map((color) => `bg-[${color}]`)
  ]
}
