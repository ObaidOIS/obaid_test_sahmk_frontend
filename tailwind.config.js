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
        primaryColor: '#079669',
        secondaryColor: '#1F4B56',
        whiteColor: '#fff',
        darkColor: '#000',
        bgColor: '#F9FAFB',
        darkGreyColor: '#6B7280',
        mediumGreyColor: '#D1D5DB',
        lightGreyColor: '#E5E7EB',
        redColor: "#C15959",
        purpleColor: '#621EF1',
        blueColor: '#3C82F6',
        yellowColor: '#F5C54A',
    },
  },
  },
  plugins: [],
}
