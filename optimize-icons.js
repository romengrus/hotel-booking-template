const imagemin = require('imagemin')
const imageminSvgo = require('imagemin-svgo')

imagemin(['src/assets/icons/**/*.svg'], 'dist/icons', {
  use: [
    imageminSvgo({
      plugins: [
        { cleanupIDs: { remove: false } },
        { cleanupNumericValues: { floatPrecision: 2 } },
        { removeStyleElement: true },
        { removeTitle: true },
        { removeViewBox: false },
        { removeDimensions: true },
        { removeAttrs: { attrs: '(fill.*|stroke.*)' } }
      ],
      multipass: true
    })
  ]
}).then(() => console.log('SVG-Icons were successfully optimized'))
