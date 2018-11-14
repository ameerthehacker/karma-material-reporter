const express = require('express');
const app = express();
const path = require('path');
const angularConfig = require('../angular.json');

const outDir = angularConfig
                  .projects['karma-awesome-reporter-ui']
                  .architect
                  .build
                  .options
                  .outputPath;

const distDir = path.join(process.cwd(), outDir);        

// Set the dist directory as statically servable
app.use(express.static(distDir));              

// Return index.html to bootstrap angular
app.get('/', (req, res) => {
  res.sendFile(distDir + '/index.html');
});

module.exports = app;