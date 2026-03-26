/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Quét toàn bộ file code trong src
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        background: "var(--background)",
        text: "var(--text)",
      }
    },
  },
  plugins: [],
}