const path = require('path');
const ncp = require('ncp').ncp;
const fs = require('fs');
const angularConfig = require('../angular.json');
const rm = require('rimraf');

const rootPath = process.cwd();
const distDir = path.join(rootPath, 'dist');

const uiOutDir =
    angularConfig.projects['karma-material-reporter-ui'].architect.build.options
      .outputPath;

if(fs.existsSync(distDir)) {
  console.log('Removing dist directory...');
  rm(distDir, () => {
    console.log('Removed dist directory...');
    build();
  });
}
else {
  build();
}

function build() {
  try {
    const uiOutDirBasename = uiOutDir.split(path.sep)[0];

    fs.mkdirSync(distDir);
    
    if (!fs.existsSync(path.join(distDir, 'server'))) {
      fs.mkdirSync(path.join(distDir, 'server'));
    }
    if (!fs.existsSync(path.join(distDir, uiOutDirBasename))) {
      fs.mkdirSync(path.join(distDir, uiOutDirBasename));
    }

    console.log('Copying package.json...');
    fs.copyFileSync(path.join(rootPath, 'package.json'), path.join(distDir, 'package.json'));
    console.log('Copying angular.json...');
    fs.copyFileSync(path.join(rootPath, 'angular.json'), path.join(distDir, 'angular.json'));
    console.log('Copying server file');
    fs.copyFileSync(path.join(rootPath, 'server', 'server.js'), path.join(distDir, 'server', 'server.js'));
    console.log('Copying index file');
    fs.copyFileSync(path.join(rootPath, 'index.js'), path.join(distDir, 'index.js'));
    console.log('Copying UI dist files');
    ncp(uiOutDir, path.join(distDir, uiOutDir), (err) => {
      if (!err) {
        console.log('Done!');
      } else {
        console.log(`Error copying UI dist files: ${err}`);
      }
    });
  }
  catch(err) {
    console.log(`Error building dist files: ${err}`);
  }
}

