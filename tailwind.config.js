const plugin = require('tailwindcss/plugin');

/**
 *  @type {import('tailwindcss').Config}
 *  @see https://tailwindcss.com/docs/configuration
 *  */
module.exports = {
  content: [
    './pages/**/*.{html,js,ts,jsx,tsx}',
    './components/**/*.{html,js,ts,jsx,tsx}',
    './src/**/*.{html,js,ts,jsx,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        subtle: "#828299",
        admin: "#1E1E1E",
        admin_bg: "#111317",
        admin_fg: "#1A1C22",
        onyx: "#0E0E2C",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        mavis: ["Mavis", "sans-serif"],
      },
      dropShadow: {
        'bright': '0 15px 25px rgb(255,255,255)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        growDown: {
          '0%': {transform: 'scaleY(0)'},
          '100%': { transform: "scaleY(1)" },
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
        growDown: 'growDown 1s ease-out',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme, addComponents }) {
      addBase({
        body: {
          color: theme('colors.white'),
          backgroundColor: theme('colors.slate.900'),
        },
      })
      addComponents({
        '.h-flex': {
          display: 'flex',
          flexDirection: 'row',
        },
        '.v-flex': {
          display: 'flex',
          flexDirection: 'column',
          },
        '.btn-red': {
          backgroundColor: theme('colors.indigo.500'),
          color: '#fff',
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
          '&:hover': {
            backgroundColor: theme('colors.indigo.600'),
          },
        },
        // '.active': {
        // backgroundColor: theme('colors.highlight'),
        // borderRadius: '.5rem',
        // padding: '.5rem 1rem',
        // justifyContent: 'center',
        // },
      })
    }),
  ],
}
