// @remove-on-eject-begin
/**
 * Copyright (c) 2019-present, Wentao Li.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end

const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const log = console.log;

const company = process.env.REACT_APP_FIN_COMPANY?process.env.REACT_APP_FIN_COMPANY:"Albert Leigh Corp";
const desc = process.env.REACT_APP_FIN_DESC?process.env.REACT_APP_FIN_DESC:"Openfin starter of production profile";

const {
    normalizePort,
} = require('../utils/serverUtils');

const port = normalizePort(process.env.PORT || '3000');

router.get('/app.json',(req,res)=>{

    // hostname localhost
    // originalUrl /app.json

    let baseUrl = req.headers.host;

    if(!baseUrl){
        baseUrl = req.hostname;
        if (port !== 80){
            baseUrl+=':'+port;
        }
        baseUrl+=req.originalUrl.substr(0,req.originalUrl.indexOf('app.json'));
    }

    if (!baseUrl.endsWith('/')){
        baseUrl+='/';
    }

    if (!baseUrl.startsWith('http')){
        if (req.connection.secure){
            baseUrl = 'https://'+baseUrl;
        }else{
            baseUrl = 'http://'+baseUrl;
        }
    }

    log(chalk.cyan('[react-openfin-scripts] config api 1#::',process.env.PUBLIC_URL));
    log(chalk.cyan('[react-openfin-scripts] config api 2# originalUrl::',req.originalUrl));
    log(chalk.cyan('[react-openfin-scripts] config api 3# url::',req.url));
    log(chalk.cyan('[react-openfin-scripts] config api 4# protocol::',req.protocol));
    log(chalk.cyan('baseUrl',baseUrl));

    res.json({
            "startup_app":{
                "name":`${process.env.REACT_APP_FIN_NAME}`,
                "url":`${baseUrl}index.html`,
                "uuid":process.env.REACT_APP_FIN_UUID,
                "applicationIcon":`${baseUrl}favicon.ico`,
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
            },
            "runtime":{
                "version":`${process.env.HADOUKEN_VERSION}`,
                "arguments":"--v=1 --enable-crash-reporting"
            },
            "shortcut":{
                "company":company,
                "description":desc,
                "icon":`${baseUrl}favicon.ico`,
                "name":`${process.env.REACT_APP_FIN_NAME}`,
                "diagnostics-shortcut":true
            }
        }
    )
});

module.exports = router;