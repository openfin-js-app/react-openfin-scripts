// @remove-on-eject-begin
/**
 * Copyright (c) 2019-present, Wentao Li.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end

process.env.REACT_APP_ENV = 'production';
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

require('../config/env');

const os = require('os');

const chalk = require('chalk');
const fse = require('fs-extra');
const log = console.log;
const path = require('path');
const paths = require('../config/paths');
const shell = require('shelljs');
const { exec } = require('pkg');


let platform = os.platform();

if (process.argv.length > 2 ){
    platform = process.argv[2];
}

if(platform==='darwin'){
    platform = 'macos';
}else if(platform === 'win32'){
    platform = 'win';
}else if (platform !== 'linux'){
    throw `Packaging on ${platform} not supported`;
}

const target = `node10-${platform}-${process.env.STANDALONE_TARGET_PLATFORM}`;

const createPackageFile = async () => {
    const packageData = await fse.readFile(paths.appPackageJson,'utf-8');
    const {scripts, devDependencies, jest, pkg, ...packageDataOther} = JSON.parse(packageData);

    const newPackageData = {
        ...packageDataOther,
        private:false,
    };

    const buildPath = path.resolve(paths.appPath,'package/package.json');

    await fse.writeFile(buildPath,JSON.stringify(newPackageData,null,2),'utf8');
    log(chalk.green(`Created package.json in ${buildPath}`));

    return newPackageData;
}


const buildBinary = async (script,name)=>{
    await exec([ script, '--target', target, '--output', name])
};

const build = async() => {
    await buildBinary(require.resolve('./serve.js'),path.resolve(paths.appPath,`package/${process.env.STANDALONE_SERVER_NAME}`));
    await buildBinary(require.resolve('./standalone.openfin.js'),path.resolve(paths.appPath,`package/${process.env.STANDALONE_NAME}`));
};


const BUILD_DIRECTORY = path.resolve(paths.appPath,'build');
const TAGET_DIRECTORY = path.resolve(paths.appPath,'package');
log(chalk.green('TARGET',target));
log(chalk.green('BUILD_DIRECTORY',BUILD_DIRECTORY));
log(chalk.green('TAGET_DIRECTORY',TAGET_DIRECTORY));
log(chalk.green('PWD',shell.pwd()));

shell.mkdir(path.resolve(paths.appPath,'package'));
shell.cp(path.resolve(paths.appPath,'.env'),TAGET_DIRECTORY);
shell.cp(path.resolve(paths.appPath,`.env.${process.env.REACT_APP_ENV}`),TAGET_DIRECTORY);
shell.cp('-R',BUILD_DIRECTORY,TAGET_DIRECTORY);
createPackageFile();

// pkg scripts/server.js --target node10-linux-x64 --output openfin_starter_server

build();