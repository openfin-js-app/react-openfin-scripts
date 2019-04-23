// @remove-on-eject-begin
/**
 * Copyright (c) 2019-present, Wentao Li.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end

process.env.REACT_APP_ENV = 'development';
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const spawn = require('child_process').spawn;
const chalk = require('chalk');
const log = console.log;
const tcpPortUsed = require('tcp-port-used');

const { connect } = require('hadouken-js-adapter');

require('../config/env');
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
let webDevServer = null;

async function startWebpackDevServer() {
    webDevServer = spawn('node',[require.resolve('./start.js')]);
    webDevServer.stdout.on('data',(data)=>{
        log(chalk.cyan(Buffer.from(data,'binary').toString()));
    });
    webDevServer.stderr.on('data',(data)=>{
        log(chalk.magenta(Buffer.from(data,'binary').toString()));
    });
    webDevServer.on('close',(data)=>{
        log(chalk.yellow(Buffer.from(data,'binary').toString()));
    });
}

async function launchApp(){
    const fin = await connect({
        uuid:process.env.REACT_APP_FIN_UUID+'_app',
        runtime:{
            version: process.env.HADOUKEN_VERSION,
            arguments:"--v=1 --remote-debugging-port=9090 --enable-crash-reporting"
        }
    });
    const version = await fin.System.getVersion();
    log(chalk.green("Connected to Hadouken version", version));

    const app = await fin.Application.start({
        "name":`${process.env.REACT_APP_FIN_NAME} [dev]`,
        "url":`http://localhost:${DEFAULT_PORT}/index.html`,
        "uuid":process.env.REACT_APP_FIN_UUID,
        "applicationIcon":`http://localhost:${DEFAULT_PORT}/favicon.ico`,
        "autoShow":false,
        "saveWindowsSate":false,
        "resizable":true,
        "frame":false,
        "defaultTop":parseInt(process.env.REACT_APP_NEW_WINDOW_TOP,10),
        "defaultLeft":parseInt(process.env.REACT_APP_NEW_WINDOW_LEFT,10),
        "defaultWidth":728,
        "defaultHeight":450,
        "minWidth":420,
        "minHeight":300
    });

    log(chalk.green(`connecting to http://localhost:${DEFAULT_PORT}`));

    app.addListener('closed',()=>{
        if (webDevServer){
            webDevServer.kill('SIGINT');
        }
        process.exit(0);
    });
}


startWebpackDevServer();

tcpPortUsed.waitUntilUsed(DEFAULT_PORT,1000,240000)
    .then(
        ()=>{
            log(chalk.green('starting openfin'));
            launchApp().then(() => {
                log(chalk.green('starting openfin success'));
                console.log("success");
            }).catch((err) => {
                log(chalk.red("Error trying to connect,", err.message));
                log(chalk.red(err.stack));
            });

        },
        (err)=>{
            log(chalk.red(err));
        }
    );