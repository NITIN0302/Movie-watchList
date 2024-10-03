/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "680px", 
        md: "768px", 
        lg: "1024px", 
        xl: "1440px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
