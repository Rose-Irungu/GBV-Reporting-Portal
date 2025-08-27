// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        gbvPurple: '#B67AB5',
      },
        animation: {
            fadeIn: 'fadeIn 0.3s ease-out',
        },
        keyframes: {
            fadeIn: {
                '0%': { opacity: 0, transform: 'scale(0.95)' },
                '100%': { opacity: 1, transform: 'scale(1)' },
            },
        },
    },
  },
 
};

