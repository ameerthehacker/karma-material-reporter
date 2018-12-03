module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['sample_test/**/*.spec.js'],
    plugins: [
      require('../index'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher')
    ],
    // configurations available for material reporter
    materialReporter: {
      serverPort: 3000,
      expandSuites: true,
      autoOpen: true
    },
    exclude: ['**/*.swp'],
    preprocessors: {},
    reporters: ['progress', 'material'],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless', 'Firefox'],
    singleRun: false,
    concurrency: Infinity
  });
};
