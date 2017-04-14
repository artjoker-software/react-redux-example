var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    singleRun: !!process.env.CI,
    frameworks: [ 'mocha', 'sinon' ],
    files: [
      'tests.webpack.js'
    ],
    plugins: [
      'karma-chai',
      'karma-sinon',
      'karma-mocha',
      'karma-webpack',
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-phantomjs-launcher'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha', 'coverage' ],
    webpackServer: {
      noInfo: true
    },
    // logLevel: config.LOG_DEBUG,
    coverageReporter: {
      reporters: [
        { type:'lcovonly', subdir: './frontend' },
        { type:'json', subdir: './frontend' },
        { type: 'html', subdir: './frontend' },
        { type: 'text-summary' }
      ]
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.less$/,
            loader: 'style!css!less'
          },
          {
            test: /\.scss$/,
            loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: 'url',
            query: { limit: 10240 }
          }
        ],
        postLoaders: [
          {
            test: /\.js$/,
            exclude: /(tests|node_modules)\//,
            loader: 'istanbul-instrumenter'
          }
        ],
        noParse: [
          /node_modules\/sinon\//
        ]
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      // Works without this somehow
      resolve: {
        alias: {
          'sinon': 'sinon/pkg/sinon'
        },
        modulesDirectories: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js']
      },
      plugins: [
        // new webpack.IgnorePlugin(/\.json$/), // Breaks the tests
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __PRODUCTION__: false,
          __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
        })
      ]
    }
  });
};