/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { Poppins: ["Poppins", "sans-serif"] },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#FFC700",
          secondary: "#70BAC6",
          accent: "#D98481",
          neutral: "#DDFFF9",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
