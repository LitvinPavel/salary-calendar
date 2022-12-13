/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js}",
  ],
  theme: {
    colors: {
      base: {
        strong: "var(--base-strong)", //"#151522"
        weak: "var(--base-weak)", //"#fcfdff"
      },
      secondary: {
        strong: "var(--secondary-strong)", //"#242431"
        weak: 'var(--secondary-weak)', //"#414050"
      },
      primary: {
        DEFAULT: 'var(--primary)', //"#634df4"
      },
      accent: {
        DEFAULT: 'var(--accent)', //"#4bd2a4"
      },
      warning: {
        DEFAULT: 'var(--warning)', //"#d25b4b"
      }
    },
    extend: {
      minWidth: {
        "sm": "24rem"/* 384px */
      },
      fontSize: {
        0: "0px",
        "xxs":"0.6rem"
      }
    },
  },
  plugins: [],
}
