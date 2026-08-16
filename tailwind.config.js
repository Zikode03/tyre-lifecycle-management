/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          graphite: '#202124',
          orange: '#F97316',
          'orange-dark': '#EA580C',
          canvas: '#F7F7F5',
          ink: '#18181B',
          muted: '#6B7280',
          line: '#E5E7EB',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(24,24,27,0.06)',
      },
    },
  },
  plugins: [],
};
