module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['sample_test/**/*.spec.js'],
    plugins: [
      require('../index'),
      require('karma-jasmine'),
      require('karma-chrome-launcher')
    ],
    // configurations available for awesome reporter
    awesomeReporter: {
      serverPort: 3000
    },
    exclude: ['**/*.swp'],
    preprocessors: {},
    reporters: ['progress', 'awesome'],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity
  });
};
