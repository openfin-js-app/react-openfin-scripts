// @remove-on-eject-begin
/**
 * Copyright (c) 2019-present, Wentao Li.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end

const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation: () => Component => {
        Component.defaultProps = { ...Component.defaultProps, t: () => "" };
        return Component;
    },
    useTranslation: (ns, options) => {
        return {
            t: (label)=>label,
            i18n: {},
            ready: true,
        }
    }
}));


jest.mock(path.resolve(appDirectory, 'src/i18n'));