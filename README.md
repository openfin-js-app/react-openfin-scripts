# react-openfin-scripts
[![version][version-badge]][CHANGELOG] [![license][license-badge]][LICENSE]

Configuration and scripts for Openfin React App.

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start-openfin` or `yarn start-openfin`

Runs the app in development mode.<br>
Meanwhile also start a openfin connection to loaded development codes.

### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

If the index.html were not found in the app build folder, 
an exception will be thrown and the whole process then exits with 1

### `npm serve` or `yarn serve`

Servers the app from built folder.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

If the index.html were not found in the app build folder, 
an exception will be thrown and the whole process then exits with 1

### `npm serve-openfin` or `yarn serve-openfin`

Servers the app from built folder.<br>
Meanwhile also start a openfin connection to loaded built codes.

### `npm package` or `yarn package`

Package the app into binary and put to package folder.<br>

### `REACT_APP_ENV` the profile environment variable

Instead of using `NODE_ENV`, react-openfin-scripts will use `REACT_APP_ENV` to load dot env profiles.

Moreover, even if `REACT_APP_ENV` is undefined, react-openfin-scripts will directly use production by default.    


[LICENSE]: ./LICENSE.md
[CHANGELOG]: ./CHANGELOG.md

[version-badge]: https://img.shields.io/badge/version-1.0.0-blue.svg
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
