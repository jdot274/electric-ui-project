
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'custom-properties': true,
        'custom-media-queries': true,
        'custom-selectors': true,
        'nesting-rules': true,
        'color-mod-function': true,
        'gap-properties': true,
        'media-query-ranges': true,
      },
    }),
    require('postcss-nested'),
    require('postcss-custom-properties'),
    require('postcss-calc'),
    require('autoprefixer'),
    require('cssnano')({
      preset: [
        'advanced',
        {
          discardComments: {
            removeAll: true,
          },
          colormin: false,
        },
      ],
    }),
  ],
  // Custom variables for glass effects
  customProperties: {
    variables: {
      '--glass-blur-amount': '10px',
      '--glass-saturation': '180%',
      '--glass-opacity': '0.1',
      '--glass-border-opacity': '0.1',
      '--glass-shadow-opacity': '0.1',
      '--glass-gradient-start': 'rgba(255, 255, 255, 0.1)',
      '--glass-gradient-end': 'rgba(255, 255, 255, 0.05)',
      '--glass-accent-purple': 'rgba(103, 76, 255, 0.2)',
      '--glass-accent-blue': 'rgba(76, 130, 255, 0.2)',
      '--glass-accent-neon': 'rgba(46, 213, 115, 0.2)',
      '--glass-dark-primary': '#1a1f35',
      '--glass-dark-secondary': '#2d1a42',
    },
  },
};
