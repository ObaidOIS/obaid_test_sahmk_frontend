/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#1F4B56',
        accentColor: '#4F9C6A',
        whiteColor: '#fff',
        darkColor: '#000',
        bgColor: '#F9FAFB',
        // gray
    },
  },
  },
  plugins: [],
}
