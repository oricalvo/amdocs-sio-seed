const webpackConfig = require("./build/webpack.config")(true);

const karmaConfig = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],
 
    reporters: ['mocha', 'junit'],
	
    //for jenkins to run this build
    junitReporter : {
      outputDir: 'test-results',
      outputFile: 'test-results.xml'
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './tests/index.js': ['webpack', 'sourcemap']
    },

    // list of files / patterns to load in the browser
    files: [
        "./tests/index.js",
        './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
        './node_modules/es6-promise/dist/es6-promise.js',
    ],

    // list of files to exclude
    exclude: [
    ],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    //logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
  }

module.exports = (cfg) => cfg.set(karmaConfig)