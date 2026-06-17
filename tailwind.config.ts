import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#141c14',
        surface: '#141c14',
        'surface-dim': '#1a1c19',
        'surface-bright': '#373a36',
        'surface-container-lowest': '#0f140f',
        'surface-container-low': '#1b231b',
        'surface-container': '#212621',
        'surface-container-high': '#282b27',
        'surface-container-highest': '#323631',
        'surface-variant': '#434842',
        primary: '#c9dbc3',
        'primary-soft': '#b7cdb2',
        'primary-fixed': '#dbead6',
        'primary-container': '#314331',
        secondary: '#d5cbb5',
        'secondary-container': '#4d4839',
        accent: '#90a68a',
        outline: '#8d9289',
        'outline-variant': '#434842',
        'on-background': '#e7e9e4',
        'on-surface': '#e7e9e4',
        'on-surface-variant': '#c7ccc3',
        'on-primary': '#172417',
        'on-primary-container': '#dbead6',
        'on-secondary': '#241f15',
        'on-secondary-container': '#e7dfcc',
      },
      fontFamily: {
        headline: ['var(--font-newsreader)', 'serif'],
        body: ['var(--font-manrope)', 'sans-serif'],
        label: ['var(--font-manrope)', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(0,0,0,0.22)',
        premium: '0 30px 80px rgba(0,0,0,0.32)',
      },
      letterSpacing: {
        luxe: '0.18em',
      },
    },
  },
  plugins: [],
};

export default config;
