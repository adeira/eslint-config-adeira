// @flow

/*::

import type { EslintConfig, EslintConfigRules } from './EslintConfig.flow';

*/

/* eslint-disable no-unused-vars */
const OFF = 0;
const WARN = 1;
const ERROR = 2;
/* eslint-enable no-unused-vars */

/**
 * This is basically copy-pasted detection from the React plugin except it doesn't
 * complain when React dependency is missing. It's because we expect non-React environments.
 * See: https://github.com/yannickcr/eslint-plugin-react/blob/6bb160459383a2eeec5d65e3de07e37e997b5f1a/lib/util/version.js#L12
 */
function detectReactVersion() {
  try {
    const react = require('react'); // eslint-disable-line import/no-extraneous-dependencies
    return react.version;
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return '999.999.999';
    }
    throw error;
  }
}

module.exports = function getCommonConfig(rules /*: EslintConfigRules */) /*: EslintConfig */ {
  return {
    /* $FlowFixMe[incompatible-return](>=0.115.0) This comment suppresses an error when upgrading
     * Flow. To see the error delete this comment and run Flow. */
    rules: {
      ...rules,
      // overwriting Prettier rules, see: https://github.com/prettier/eslint-config-prettier/blob/9444ee0b20f9af3ff364f62d6a9ab967ad673a9d/README.md#special-rules
      'curly': [ERROR, 'all'],
      'prettier/prettier': [
        ERROR,
        {
          // see: prettier.config.js
          bracketSpacing: true,
          printWidth: 100, // see: https://prettier.io/docs/en/options.html#print-width
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'all',
          quoteProps: 'consistent',
        },
      ],
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.android.js', '.ios.js', '.native.js', '.web.js'],
        },
      },
      'react': {
        version: detectReactVersion(),
      },
    },

    globals: {
      global: 'readonly', // TODO: make it 'off'
      globalThis: 'readonly', // https://github.com/tc39/proposal-global
      __DEV__: 'readonly',
      FormData: 'readonly', // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    },

    plugins: [
      'eslint-plugin-flowtype',
      'eslint-plugin-jest',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'eslint-plugin-react-native',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-relay',
      'eslint-plugin-import',
      'eslint-plugin-monorepo',
      'eslint-plugin-node',
      'eslint-plugin-eslint-comments',
      'eslint-plugin-promise',
      'eslint-plugin-adeira',
      'eslint-plugin-sx',
      'eslint-plugin-prettier',
    ],

    overrides: [
      {
        files: ['**/__generated__/*.graphql.js'],
        rules: {
          // Relay disables generated files with unlimited scope
          'eslint-comments/no-unlimited-disable': OFF,
        },
      },
    ],
  };
};
