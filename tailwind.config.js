/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customRadioColor: '#34484F', // Example custom color
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'], // Enable 'checked' variant for background color
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Include Tailwind CSS forms plugin for better form controls
  ],
}