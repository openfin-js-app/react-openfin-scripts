// @remove-on-eject-begin
/**
 * Copyright (c) 2019-present, Wentao Li.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end

// process.env.REACT_APP_ENV = 'production';
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const execFile = require('child_process').execFile;
const chalk = require('chalk');
const log = console.log;
const tcpPortUsed = require('tcp-port-used');

const { connect } = require('hadouken-js-adapter');

require('../config/env');
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
let expressServer = null;


async function startServer() {
    const env = Object.create(process.env);
    expressServer = execFile(process.cwd()+`/${process.env.STANDALONE_SERVER_NAME}`,[],{env:env});
    expressServer.stdout.on('data',(data)=>{
        log(chalk.cyan(Buffer.from(data,'binary').toString()));
    });
    expressServer.stderr.on('data',(data)=>{
        try{
            log(chalk.red(Buffer.from(data,'binary').toString()));
        }catch(e){
            log(chalk.red(data));

        }
    });
    expressServer.on('close',(data)=>{
        log(chalk.yellow(Buffer.from(data,'binary').toString()));
    });
}

async function launchApp(){
    const fin = await connect({
        uuid:process.env.REACT_APP_FIN_UUID+'_app',
        runtime:{
            version: process.env.HADOUKEN_VERSION,
        }
    });
    const version = await fin.System.getVersion();
    log(chalk.green("Connected to Hadouken version", version));

    const app = await fin.Application.start({
        "name":`${process.env.REACT_APP_FIN_NAME}`,
        "url":`http://localhost:${DEFAULT_PORT}/index.html`,
        "uuid":process.env.REACT_APP_FIN_UUID,
        "applicationIcon":`http://localhost:${DEFAULT_PORT}/favicon.ico`,
        "autoShow":false,
        "saveWindowsSate":false,
        "resizable":true,
        "frame":false,
        "defaultCentered":true,
        "defaultTop":parseInt(process.env.REACT_APP_NEW_WINDOW_TOP,10),
        "defaultLeft":parseInt(process.env.REACT_APP_NEW_WINDOW_LEFT,10),
        "defaultWidth":728,
        "defaultHeight":450,
        "minWidth":420,
        "minHeight":300
    });

    log(chalk.green(`connecting to http://localhost:${DEFAULT_PORT}`));

    app.addListener('closed',()=>{
        if (expressServer){
            expressServer.kill('SIGINT');
        }
        process.exit(0);
    });
}

startServer();

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