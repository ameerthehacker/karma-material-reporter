module.exports = (karmaLog) => {
  const express = require('express');
  const app = express();
  const path = require('path');
  const angularConfig = require('../angular.json');
  const http = require('http');
  const favicon = require('serve-favicon');

  const outDir =
    angularConfig.projects['karma-awesome-reporter-ui'].architect.build.options
      .outputPath;
  let env = {};
  const server = http.createServer(app);
  const io = require('socket.io')(server);

  io.on('connection', (socket) => {
    socket.emit('init', env);
  });

  const distDir = path.join(process.cwd(), outDir);

  // Set karma as favicon
  app.use(
    favicon(path.join(distDir, 'src', 'assets', 'images', 'favicon.ico'))
  );

  // Set the dist directory as statically servable
  app.use(express.static(distDir));

  // Return index.html to bootstrap angular
  app.get('/', (req, res) => {
    res.sendFile(distDir + '/index.html');
  });

  const onSpecCompleteFn = (browser, specResult) => {
    let suite = env[browser.id].info.specs[specResult.suite[0]];
    env[browser.id].logs[specResult.id] = {
      fullName: specResult.fullName,
      log: specResult.log
    };

    updateSuiteStatus(
      suite,
      specResult.success ? 'success' : 'fail',
      specResult.time
    );

    for (let i = 1; i < specResult.suite.length; i++) {
      suite = suite[specResult.suite[i]];
      updateSuiteStatus(
        suite,
        specResult.success ? 'success' : 'fail',
        specResult.time
      );
    }

    const index = suite._.indexOf(specResult.description);
    suite._[index] = specResult;

    io.emit('specResult', env);
  };

  const updateSuiteStatus = (suite, status, time) => {
    if (!suite.$) {
      suite.$ = { time: 0, status: '' };
    }
    suite.$.status = suite.$.status === 'fail' ? 'fail' : status;
    suite.$.time += time;
  };

  const onBrowserRegisterFn = (browser) => {
    env[browser.id] = {
      browser,
      logs: {},
      error: undefined,
      summary: undefined
    };
    io.emit('browserError', { id: browser.id, error: undefined });
  };

  const onRunStartFn = (browsersCollection) => {};

  const onBrowserChangeFn = (browserCollection) => {};

  const onBrowserStartFn = (browser, info) => {
    env[browser.id].info = info;
  };

  const onBrowserCompleteFn = (browser) => {
    env[browser.id].summary = browser.lastResult;
    io.emit('summary', { id: browser.id, summary: browser.lastResult });
  };

  const onBrowserErrorFn = (browser, error) => {
    io.emit('browserError', { id: browser.id, error });
    env[browser.id].error = error;
  };

  const onBrowserLogFn = (browser, log, type) => {};

  const onRunCompleteFn = (browser, log, type) => {};

  const onExitFn = (instance) => {
    return () => {
      instance.close();
      karmaLog.info('Awesome reporter server closing...');
      // Exit the process otherwise karma will have trouble exiting
      process.exit();
    };
  };

  return {
    server,
    onSpecCompleteFn,
    onBrowserChangeFn,
    onBrowserStartFn,
    onBrowserCompleteFn,
    onBrowserErrorFn,
    onBrowserLogFn,
    onRunCompleteFn,
    onExitFn,
    onBrowserRegisterFn,
    onRunStartFn
  };
};
