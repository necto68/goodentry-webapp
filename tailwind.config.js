/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },

      colors: {
        brand: {
          DEFAULT: "#0FFD6A",
          semiDark: "#0BBF50",
          dark: "#009D3C",
        },

        error: {
          DEFAULT: "#DC4446",
          semiDark: "#BD3A3C",
          dark: "#8C2B2B",
        },

        long: {
          DEFAULT: "#0FFD6A",
          semiDark: "#0BBF50",
          dark: "#009D3C",
        },

        short: {
          DEFAULT: "#DC4446",
          semiDark: "#BD3A3C",
          dark: "#8C2B2B",
        },

        text: {
          white: "#F8FAFC",
          gray: "#8A9098",
          blueGray: "#94A3B8",
          blue: "#3B99FC",
        },

        bg: {
          DEFAULT: "#0E0F11",
          primary: "#121418",
          secondary: "#1E2229",
          details: "#151A1F",
          secondaryLight: "#52555A",
          secondaryDark: "#44474D",
        },

        interactions: {
          null: "#3E4958",
          green: "#3CB187",
          orange: "#EF9E40",
        },

        white: "#FFFFFF",
        black: "#000000",
        transparent: "transparent",
      },

      backgroundImage: {
        glow: "linear-gradient(270deg, #009D3C 16.28%, #0FFD6A 48.65%, #009D3C 95.96%)",
      },

      boxShadow: {
        glow: "0 4px 30px #0FFD6A",
      },
    },
  },
};
