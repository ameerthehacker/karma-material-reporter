const MaterialReporter = function(config, logger) {
  const log = logger.create('karma.material.reporter');
  const opn = require('opn');
  const reporterConfig = config.materialReporter || {};
  // Default settings
  reporterConfig.serverPort = reporterConfig.serverPort || 3000;
  if (reporterConfig.expandSuites === undefined) {
    reporterConfig.expandSuites = true;
  }
  const {
    server,
    onSpecCompleteFn,
    onBrowserChangeFn,
    onBrowserCompleteFn,
    onBrowserErrorFn,
    onBrowserLogFn,
    onBrowserRegisterFn,
    onBrowserStartFn,
    onExitFn,
    onRunCompleteFn,
    onRunStartFn
  } = require('./server/server')(log, reporterConfig);

  log.info('Starting material reporter server');
  const instance = server
    .listen(reporterConfig.serverPort, () => {
      log.info(
        `Material reporter server started at port ${reporterConfig.serverPort}`
      );

      if (reporterConfig.autoOpen !== false) {
        opn(`http://localhost:${reporterConfig.serverPort}`);
      }
    })
    .on('error', (err) => {
      log.error(`Unable to start material reporter server: ${err}`);
    });

  // Link all the hooks to the express server
  this.onSpecComplete = onSpecCompleteFn;
  this.onBrowserChange = onBrowserChangeFn;
  this.onBrowserComplete = onBrowserCompleteFn;
  this.onBrowserError = onBrowserErrorFn;
  this.onBrowserLog = onBrowserLogFn;
  this.onBrowserRegister = onBrowserRegisterFn;
  this.onBrowserStart = onBrowserStartFn;
  this.onExit = onExitFn(instance);
  this.onRunComplete = onRunCompleteFn;
  this.onRunStart = onRunStartFn;
};

MaterialReporter.$inject = ['config', 'logger'];

module.exports = {
  'reporter:material': ['type', MaterialReporter]
};
