# Karma Material Reporter

[![CircleCI](https://circleci.com/gh/ameerthehacker/karma-material-reporter.svg?style=svg)](https://circleci.com/gh/ameerthehacker/karma-material-reporter)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/Karma-awesome-reporter/Lobby)
[![codecov](https://codecov.io/gh/ameerthehacker/karma-material-reporter/branch/master/graph/badge.svg)](https://codecov.io/gh/ameerthehacker/karma-material-reporter)

Visualize karma test results in real time with material designed reporter :hearts:

![Karma Material Reporter](https://i.imgur.com/76MVpsm.png)

## Features

:bookmark_tabs: Test results from each browser are separated out into tabs

:file_folder: Specs are grouped under suite as expandable menu

:clock10: See the time it took to run individual suite and spec

:mag: No more clutter between specs and error logs

![Log Error](https://i.imgur.com/ARGp65l.png)

- :tada: No more browser reload whenever you tweak a test

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

| Option     |                             Description                              | Default |
| ---------- | :------------------------------------------------------------------: | ------: |
| serverPort |         port in which the reporter startes a express server          |    3000 |
| autoOpen   | whether to open the reporter UI automatically in the default browser |    true |

You can change the above options by updating **karma.conf.js** as showm below

```js
module.exports = function(config) {
 config.set({
   ...
   plugins: [
     ...
     require('karma-material-repoter')
   ],
   awesomeReporter: {
     serverPort: 3000,
     autoOpen: true
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

:heavy_exclamation_mark: If you have any ideas are suggestion please feel free to create an issue before jumping into development

Show your support by :star: the repo

## License

MIT © [Ameer Jhan](mailto:ameerjhanprof@gmail.com)
