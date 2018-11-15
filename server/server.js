module.exports = (karmaLog) => {
  const express = require('express');
  const server = express();
  const path = require('path');
  const angularConfig = require('../angular.json');

  const outDir =
    angularConfig.projects['karma-awesome-reporter-ui'].architect.build.options
      .outputPath;

  const distDir = path.join(process.cwd(), outDir);

  // Set the dist directory as statically servable
  server.use(express.static(distDir));

  // Return index.html to bootstrap angular
  server.get('/', (req, res) => {
    res.sendFile(distDir + '/index.html');
  });

  const onSpecCompleteFn = (browser, result) => {};

  const onBrowserRegisterFn = (browser) => {};

  const onRunStartFn = (browsersCollection) => {};

  const onBrowserChangeFn = (browserCollection) => {};

  const onBrowserStartFn = (browser, info) => {};

  const onBrowserCompleteFn = (browser) => {};

  const onBrowserErrorFn = (browser, error) => {};

  const onBrowserLogFn = (browser, log, type) => {};

  const onRunCompleteFn = (browser, log, type) => {};

  const onExitFn = (instance) => {
    return () => {
      instance.close(() => {
        karmaLog.info('Awesome reporter server closed');
      });
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
