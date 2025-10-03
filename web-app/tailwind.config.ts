// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: '#eeeeee', // beige
          light: '#ffffff',
          dark: '#cccccc',
        },
        primary: {
          DEFAULT: '#048b9a', // turquoise
          light: '#00a6a0',
          dark: '#00707f',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
}