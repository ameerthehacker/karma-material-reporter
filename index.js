const AwesomeReporter = function(config, logger) {
  const log = logger.create('karma.awesome.reporter');
  const { server, onSpecCompleteFn } = require('./server/server')(log);
  const reporterConfig = config.awesomeReporter || {};
  // Default settings
  reporterConfig.serverPort = reporterConfig.serverPort || 3000;

  log.info('Starting awesome reporter server');
  server.listen(reporterConfig.serverPort, () => {
    log.info('Awesome reporter server started');
  }).on('error', (err) => {
    log.error(`Unable to start awesome reporter server: ${err}`);
  })

  this.onSpecComplete = onSpecCompleteFn;
};

AwesomeReporter.$inject = ['config', 'logger'];

module.exports = {
  'reporter:awesome': ['type', AwesomeReporter]
};