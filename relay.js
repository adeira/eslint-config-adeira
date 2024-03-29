// @flow

const getCommonConfig = require('./src/getCommonConfig');
const relayPreset = require('./src/presets/relay');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig } from './src/EslintConfig.flow';

*/

module.exports = (getCommonConfig(WARN, relayPreset) /*: EslintConfig */);
