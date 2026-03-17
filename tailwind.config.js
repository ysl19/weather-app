export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "today-large": "url('/assets/images/bg-today-large.svg')",
        "today-small": "url('/assets/images/bg-today-small.svg')",
      },
    },
  },
  plugins: [],
};
