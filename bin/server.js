#!/usr/bin/env node
require('babel-register');

var path = require('path');
var rootDir = path.resolve(__dirname, '..');

// Define isomorphic constants.
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = (process.env.NODE_ENV === 'local');
global.__PRODUCTION__ = (process.env.NODE_ENV === 'production');

// Connect piping
if (__DEVELOPMENT__) {
  const pipingOptions = { hook: true, ignore: /(\/\.|~$|\.json$)/i };
  const piping = require('piping')(pipingOptions);
  console.log((piping) ? 'Piping is watching for changes' : 'Piping failed to load');
}

// Connect isomorphic tools
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .server(rootDir, function() {
    require('../src/server');
  });
