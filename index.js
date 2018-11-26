const MaterialReporter = function(config, logger) {
  const log = logger.create('karma.awesome.reporter');
  const opn = require('opn');
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
  } = require('./server/server')(log);
  const reporterConfig = config.awesomeReporter || {};
  // Default settings
  reporterConfig.serverPort = reporterConfig.serverPort || 3000;

  log.info('Starting awesome reporter server');
  const instance = server
    .listen(reporterConfig.serverPort, () => {
      log.info('Awesome reporter server started');

      if (reporterConfig.autoOpen !== false) {
        opn('http://localhost:3000');
      }
    })
    .on('error', (err) => {
      log.error(`Unable to start awesome reporter server: ${err}`);
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
