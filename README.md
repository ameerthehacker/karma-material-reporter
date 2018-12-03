<h1 align="center">Karma Material Reporter</h1>

<p align="center">
  <a href="https://circleci.com/gh/ameerthehacker/karma-material-reporter">
    <img src="https://circleci.com/gh/ameerthehacker/karma-material-reporter.svg?style=shield" alt="CircleCI">
  </a>
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=shield" alt="code style: prettier">
  </a>
  <a href="https://gitter.im/Karma-material-reporter/Lobby">
    <img src="https://badges.gitter.im/Join%20Chat.svg" alt="Join the chat at https://gitter.im/Karma-material-reporter/Lobby">
  </a>
  <a href="https://codecov.io/gh/ameerthehacker/karma-material-reporter">
    <img src="https://codecov.io/gh/ameerthehacker/karma-material-reporter/branch/master/graph/badge.svg" alt="codecov">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release">
  </a>
</p>
<p align="center">Visualize karma test results in real time with material designed reporter :hearts:</p>

![Karma Material Reporter](https://i.imgur.com/76MVpsm.png)

## Features

:bookmark_tabs: Test results from each browser are separated out into tabs

:file_folder: Specs are grouped under suite as expandable menu

:clock10: See the time it took to run individual suite and spec

:mag: No more clutter between specs and error logs

![Log Error](https://i.imgur.com/ARGp65l.png)

:tada: No more browser reload whenever you tweak a test

![Async Test](https://i.imgur.com/AE42Wix.png)

:x: Browser errors are reported in a tidy way

![Browser Error](https://imgur.com/U1sCcut.png)

## Installation

1. Install **karma-material-reporter** as dev dependency

```
npm install karma-material-reporter --save-dev
```

2. Update **karma.conf.js** to use karma-material-reporter

```js
module.exports = function(config) {
 config.set({
   ...
   plugins: [
     ...
     require('karma-material-repoter')
   ],
   ...
   reporters: ['progress', 'material'],
 });
};
```

Voila! power up your tests with karma and you should see the reporter opeing up in your default browser.

## Availble Configurations

|    Option    |                             Description                              | Default |
| :----------: | :------------------------------------------------------------------: | :-----: |
|  serverPort  |         port in which the reporter startes a express server          |  3000   |
|   autoOpen   | whether to open the reporter UI automatically in the default browser |  true   |
| expandSuites |                expand all the expandable suite menus                 |  true   |

You can change the above options by updating **karma.conf.js** as showm below

```js
module.exports = function(config) {
 config.set({
   ...
   plugins: [
     ...
     require('karma-material-repoter')
   ],
   materialReporter: {
     serverPort: 3000,
     autoOpen: true,
     expandSuites: true
   },
   ...
   reporters: ['progress', 'material'],
 });
};
```

## How to Contribute?

### Project Structure

- The UI is built with **angular** and **angular material** which is located in the **ui** directory
- The express server files are located in the **server** directory

### Local Setup

1. Clone the repo using

```sh
git clone https://github.com/ameerthehacker/karma-material-reporter.git
```

2. Install npm dependencies

```sh
npm install
```

3. Run the tests

```
npm run test
```

### Running karma-material-reporter in Development

1. Build the angular UI

```sh
npm run build-ui:watch
```

2. Start the reporter with few sample tests

```sh
npm run dev
```

:heavy_exclamation_mark: If you have any ideas or suggestions please feel free to create an issue before jumping into development

Show your support by :star: the repo

## License

MIT © [Ameer Jhan](mailto:ameerjhanprof@gmail.com)
