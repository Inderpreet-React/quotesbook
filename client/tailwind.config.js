/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};

// module.exports = {
//   future: {
//     // removeDeprecatedGapUtilities: true,
//     // purgeLayersByDefault: true,
//   },
//   purge: [],
//   theme: {
//     extend: {},
//   },
//   variants: {},
//   plugins: [],
// }
