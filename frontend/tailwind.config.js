/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        '3d': 'rotateX(-180deg) rotateY(-180deg) rotateZ(-180deg) scaleX(0.5) scaleY(0.5) scaleZ(0.5)',
      },
    },
  },
  plugins: [],
}

