module.exports = {
  extends: 'stylelint-config-recommended-scss',
  plugins: ['stylelint-order'],
  ignoreFiles: ['src/**/vendor/*.scss'],
  rules: {
    /**
     * Check selector ordering
     * https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md
     */
    'order/order': [
      'custom-properties',
      // mixin includes
      {
        type: 'at-rule',
        name: 'include'
      },
      'declarations',
      // media queries
      {
        type: 'at-rule',
        name: 'media'
      },
      // pseudo selectors & pseudo elements
      {
        type: 'rule',
        selector: '^&:\\w+$'
      },
      // custom selectors
      {
        type: 'rule',
        selector: '^\\.[-_a-zA-Z0-9]+'
      },
      // bem blocks
      {
        type: 'rule',
        selector: '^&__[-a-z0-9]+'
      },
      // bem modifiers
      {
        type: 'rule',
        selector: '^&_[-a-z0-9]+'
      }
    ],
    /**
     * Check css rules order
     * https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-order/README.md
     */
    'order/properties-order': [
      [
        {
          properties: [
            'content',
            'box-sizing',
            'display',
            'flex',
            'flex-wrap',
            'flex-basis',
            'flex-direction',
            'flex-flow',
            'flex-grow',
            'flex-shrink',
            'align-content',
            'align-items',
            'align-self',
            'justify-content',
            'order',
            'grid',
            'grid-area',
            'grid-auto-*',
            'grid-column',
            'grid-column-*',
            'grid-gap',
            'grid-row',
            'grid-row-*',
            'grid-template',
            'grid-template-*',
            'position',
            'z-index',
            'top',
            'right',
            'bottom',
            'left',
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',
            'margin',
            'margin-*',
            'border',
            'border-*',
            'padding',
            'padding-*',
            'overflow',
            'overflow-*'
          ]
        },
        {
          properties: [
            'transform',
            'transform-*',
            'backface-visibility',
            'perspective',
            'perspective-origin',
            'transition',
            'transition-*',
            'animation',
            'animation-*'
          ]
        }
      ],
      {
        severity: 'warning'
      }
    ]
  }
};
