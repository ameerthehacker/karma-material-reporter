module.exports = (karmaLog) => {
  const express = require('express');
  const app = express();
  const path = require('path');
  const angularConfig = require('../angular.json');
  const http = require('http');

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

  // Set the dist directory as statically servable
  app.use(express.static(distDir));

  // Return index.html to bootstrap angular
  app.get('/', (req, res) => {
    res.sendFile(distDir + '/index.html');
  });

  const onSpecCompleteFn = (browser, result) => {
    env[browser.id] = { browser, result };
  };

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
        // Exit the process otherwise karma will have trouble exiting
        process.exit();
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
