/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    extend: {
      animation: {
        heartbeat: "heartbeat 0.2s",
      },
      keyframes: {
        heartbeat: {
          "75%, 100%": { transform: "scale(0.75)", opacity: "0.5" },
        },
      },
      colors: {
        primary: { DEFAULT: colors.sky["700"], ...colors.sky },
        dark: { DEFAULT: colors.neutral["700"] },
        light: { DEFAULT: colors.neutral["100"] },
      },
      container: {
        center: true,
        padding: "1.5rem",
      },
      screens: {
        mobile: { max: "1023px" },
        desktop: "1024px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp"), require("@formkit/themes/tailwindcss")],
  content: ["./formkit.config.ts"],
};
