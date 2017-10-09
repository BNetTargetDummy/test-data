module.exports = {
  'extends': 'eslint:recommended',
  'env': {
    'es6': true,
    'node': true,
    'browser': false
  },
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'modules': true
    }
  },
  'rules': {
    'array-bracket-spacing': ['error', 'never'],
    'block-scoped-var': 'error',
    'brace-style': ['error', '1tbs', {
      'allowSingleLine': false
    }],
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'never',
    }],
    'comma-spacing': 'error',
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'curly': ['error', 'all'],
    'eol-last': 'error',
    'eqeqeq': ['error', 'smart'],
    'guard-for-in': 'error',
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true
    }],
    'linebreak-style': ['error', 'unix'],
    'lines-around-comment': ['error', {
      'beforeBlockComment': true,
      'afterBlockComment': false
    }],
    'new-parens': 'error',
    'no-array-constructor': 'error',
    'no-caller': 'error',
    'no-catch-shadow': 'error',
    'no-console': ['error', { allow: ['log'] }],
    'no-dupe-keys': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-parens': ['error', 'functions'],
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-native-reassign': 'error',
    'no-nested-ternary': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-process-exit': 'error',
    'no-proto': 'error',
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-spaced-func': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'error',
    'no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'none'
    }],
    'no-with': 'error',
    'object-curly-spacing': ['error', 'always'],
    'one-var': ['error', 'never'],
    'quote-props': ['error', 'consistent-as-needed'],
    'quotes': ['error', 'single', 'avoid-escape'],
    'semi': ['error', 'always'],
    'semi-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'always'
    }],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': ['error', 'always'],
    'strict': ['error', 'global'],
    'yoda': ['error', 'never'],
    'max-nested-callbacks': [1, 5],
    'valid-jsdoc': [1, {
      'prefer': {
        'arg': 'param',
        'argument': 'param',
        'class': 'constructor',
        'property': 'prop',
        'returns': 'return'
      }
    }]
  }
}
