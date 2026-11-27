/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        risk: {
          norisk: '#10b981', // green-500
          low: '#84cc16',    // lime-500
          medium: '#f59e0b', // amber-500
          high: '#f97316',   // orange-500
          veryhigh: '#ef4444' // red-500
        }
      }
    },
  },
  plugins: [],
}
