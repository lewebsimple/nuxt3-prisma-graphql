/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
  content: [],
};
