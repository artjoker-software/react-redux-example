require('babel-polyfill');

const componentsContext = require.context('./src/components', true, /\.js$/);
componentsContext.keys().forEach(componentsContext);

const testsContext = require.context('./src/', true, /\.test\.js$/);
testsContext.keys().forEach(testsContext);
