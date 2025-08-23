// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // Ensure this path is included
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Ensure this path is included
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;