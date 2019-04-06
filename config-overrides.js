/* eslint-disable */
const { override, useEslintRc, enableEslintTypescript, addWebpackAlias } = require('customize-cra');

module.exports = override(
  useEslintRc(),
  enableEslintTypescript(),
);
