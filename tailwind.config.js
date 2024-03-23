/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    
  ],
  theme: {
    extend: {
      colors: {
        'light-bg': '#9eff90',
        'light-text': '#800080', // Updated to match your initial opurple-900 color
        'light-p': '#ff5757',
        'light-s': '#85a8ff',
        'dark-bg': '#211951', // Updated to match your initial oblue-950 color
        'dark-text': '#ffe1fe',
        'dark-p': '#29fe1d',
        'dark-s': '#ff5757',
      oblue: {
        DEFAULT: '#0000FF',
        '50': '#e8f1ff',
        '100': '#d5e4ff',
        '200': '#b3ccff',
        '300': '#85a8ff',
        '400': '#5676ff',
        '500': '#2f45ff',
        '600': '#0c0eff',
        '700': '#0000ff',
        '800': '#0609cd',
        '900': '#10169f',
        '950': '#0a0b5c',
      },
      ored: {
          DEFAULT: '#FF0000',
          '50': '#fff0f0',
          '100': '#ffdddd',
          '200': '#ffc0c0',
          '300': '#ff9494',
          '400': '#ff5757',
          '500': '#ff2323',
          '600': '#ff0000',
          '700': '#d70000',
          '800': '#b10303',
          '900': '#920a0a',
          '950': '#500000',
      },
      opurple: {
          DEFAULT: '#800080',
          '50': '#fff1fe',
          '100': '#ffe1fe',
          '200': '#ffc3fe',
          '300': '#ff94f9',
          '400': '#ff54f6',
          '500': '#ff16f4',
          '600': '#f500ff',
          '700': '#d100d9',
          '800': '#ad00b1',
          '900': '#800080',
          '950': '#620063',
      },
      ogreen: {
          DEFAULT: '#008000',
          '50': '#e9ffe4',
          '100': '#ccffc4',
          '200': '#9eff90',
          '300': '#5fff50',
          '400': '#29fe1d',
          '500': '#07e500',
          '600': '#00b800',
          '700': '#008000',
          '800': '#076d08',
          '900': '#0b5c0d',
          '950': '#003404',
      },
      }
    },
  },
  plugins: [],
  
};
