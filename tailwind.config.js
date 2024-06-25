/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        hanaLightGreen: '28B2A5',
        hanaYellow: 'FFF7B4',
        hanaPink: 'FFDDE9',
        hanaLime: 'E0FFE1',
        hanaSkyblue: 'CBFAFF',
      },
    },
  },
  plugins: [],
};
