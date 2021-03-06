// @remove-on-eject-begin
/**
 * Copyright (c) 2019-present, Wentao Li.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end
'use strict';

const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
    presets: [require.resolve('babel-preset-react-app')],
    babelrc: false,
    configFile: false,
});
