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
        bauble: "#ffd9d9",
        koble_primary: "#DD2222",
        koble_primaryHighlight: "#e43535",
        koble_secondary: "#181a1b",
        koble_background: "#1E1E1E",
        koble_backgroundTwo: "#404040",
        koble_backgroundThree: "#313131",
        koble_subtle: "#828299",
        koble_accent: "#edf1f2",
        koble_border: "#ffffff",
        koble_highlight: "rgba(255, 255, 255, 0.1)",
        koble_purpleNight:"rgba(102,120,255,0.1)",
        koble_overlay: "rgba(0, 0, 0, 0.5)",

      },
      fontFamily: {
        mavis: ["Mavis", "sans"],
        sans: ["Roboto", "sans-serif"],
        serif: ["Bahnschrift", "serif"],
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
        '.btn-indigo': {
          backgroundColor: theme('colors.indigo.500'),
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          padding: '.25rem .5rem',
          borderRadius: '.25rem',
          fontWeight: '800',
          '&:hover': {
            backgroundColor: theme('colors.indigo.600'),
          },
        },
        '.btn-glow': {
          // --x-px: calc(var(--x) * 1px);
          // --y-px: calc(var(--y) * 1px);
          // --border: 2px;
          // background: rgba(255, 255, 255, 0.125);
          // border-radius: 0.5rem;
          // overflow: hidden;


          // backgroundColor: rgba(255, 255, 255, 0.125);

        }

      })
    }),
  ],
}
