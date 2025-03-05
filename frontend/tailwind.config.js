/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '2500': '2500ms', // Añadir una duración de 1.5 segundos
      },
      colors: {
        emerald: {
          500: '#10B981',
          700: '#047857',
          900: '#064E3B',
        },
      },
    },
  },
  plugins: [],
}

