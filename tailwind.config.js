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
        darkNavyColor: '#09202D',
        lightGreenColor: "#10B981",
        lightRedColor: '#EF4444',
        mediumGreenColor: "#1D6362",
        brightGreenColor: '#dcf2e1',
        brightGreyColor: '#e2e6ea',
        brightRedColor: '#ffeaea',
        darkAmberColor: '#C9A037',
        lightAmberColor: '#F5C54A',
        goldColor: '#B9A36A',
        navyColor: '#5046E5'
    },
  },
  },
  plugins: [],
}
