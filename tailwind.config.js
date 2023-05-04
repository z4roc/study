/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      maxHeight: {
        "9/10": "calc(100vh - 8.9vh)",
        "3/4": "75vh",
      },
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
      },
      colors: {
        bg: "#16161e",
        content: "#1a1b26",
        focus: "#1c1d29",
        text: "#506996",
        bglight: "#38abe6",
        bgcontentlight: "#f7f7f7",
        lightborder: "#e3e3e3",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
