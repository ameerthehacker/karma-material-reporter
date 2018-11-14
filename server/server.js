module.exports = (log) => {
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

  return {
    server,
    onSpecCompleteFn
  };
};
