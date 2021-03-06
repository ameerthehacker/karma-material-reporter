module.exports = (karmaLog, reporterConfig) => {
  const express = require('express');
  const app = express();
  const path = require('path');
  const angularConfig = require('../angular.json');
  const http = require('http');
  const favicon = require('serve-favicon');
  let rootDir = path.dirname(__dirname);

  const outDir =
    angularConfig.projects['karma-material-reporter-ui'].architect.build.options
      .outputPath;
  let env = {};
  let settings = reporterConfig;
  const server = http.createServer(app);
  const io = require('socket.io')(server);

  io.on('connection', (socket) => {
    socket.emit('init', env);
    socket.emit('settings', reporterConfig);
  });

  const distDir = path.join(rootDir, outDir);

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
    if (!env[browser.id].info.specs[specResult.suite[0]]) {
      env[browser.id].info.specs[specResult.suite[0]] = {
        _: []
      };
    }

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
      if (!suite[specResult.suite[i]]) {
        suite[specResult.suite[i]] = {
          _: []
        };
      }

      suite = suite[specResult.suite[i]];

      updateSuiteStatus(
        suite,
        specResult.success ? 'success' : 'fail',
        specResult.time
      );
    }

    const index = suite._.indexOf(specResult.description);

    if (index === -1) {
      suite._.push(specResult);
    } else {
      suite._[index] = specResult;
    }

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
      karmaLog.info('Material reporter server closing...');
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
