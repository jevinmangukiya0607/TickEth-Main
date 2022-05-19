module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['quicksand'],
        Montserrat: ['Montserrat'],
        qs: ['quicksand', 'sans-serif'],
      },
      width: {
        500: '500px',
      },
      height: {
        500: '500px',
      },
      colors: {
        orange: '#E95527',
        red: '#F54848',
        beige: '#EDE7D9',
        lightBlue: '#CFDBDB',
        'eth-violet': '#673C95',
      },
      backgroundImage: {
        'main-bg': "url('/bg-img.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
};
