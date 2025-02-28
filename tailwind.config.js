/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.15)',
          dark: 'rgba(255, 255, 255, 0.2)',
        },
        'glass-dark': {
          DEFAULT: '#1a1f35',
          secondary: '#2d1a42',
        },
        'glass-accent': {
          purple: 'rgba(103, 76, 255, 0.2)',
          blue: 'rgba(76, 130, 255, 0.2)',
          neon: 'rgba(46, 213, 115, 0.2)',
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      backdropSaturate: {
        0: '0',
        50: '.5',
        100: '1',
        150: '1.5',
        180: '1.8',
        200: '2',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'holographic': 'holographic-rotate 20s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(var(--glow-color), 0.5)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(var(--glow-color), 0.7)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'shimmer': {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
        'holographic-rotate': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
      boxShadow: {
        'glass-sm': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'glass-md': '0 6px 10px rgba(0, 0, 0, 0.15)',
        'glass-lg': '0 8px 16px rgba(0, 0, 0, 0.2)',
        'glass-xl': '0 12px 24px rgba(0, 0, 0, 0.25)',
        'glass-2xl': '0 20px 40px rgba(0, 0, 0, 0.3)',
        'glass-inner': 'inset 0 0 1px rgba(255, 255, 255, 0.1)',
        'glass-glow': '0 0 100px rgba(103, 76, 255, 0.1)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'glass-dark-gradient': 'linear-gradient(135deg, #1a1f35, #2d1a42)',
        'glass-border': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
        'glass-radial': 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
      },
    },
  },
  plugins: [
    // Custom plugin for glass effects
    function({ addUtilities, theme }) {
      const glassUtilities = {
        '.glass-base': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-frosted': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        },
        '.glass-holographic': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
          backdropFilter: 'blur(10px) hue-rotate(20deg)',
          WebkitBackdropFilter: 'blur(10px) hue-rotate(20deg)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: theme('backgroundImage.glass-radial'),
            animation: theme('animation.holographic'),
          },
        },
      };

      addUtilities(glassUtilities, ['hover', 'focus']);
    },
  ],
};
