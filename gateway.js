#! /usr/bin/env node
// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: multitenancy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs-extra');
var commandLib = require('./lib/mtg-commands.js');

if (argv._.length < 1) {
  return commandLib.help();
}

var command = argv._[0];

if (argv._.length < 1) {
  return console.log('\n Usage: mtg %s\n', command)
}

switch (command) {

  // start gateway
  case 'start':
    commandLib.start()
    break;

  // restart gateway
  case 'restart':
    commandLib.restart()
    break;

  // stop gateway
  case 'stop':
    commandLib.stop()
    break;

  default:
    commandLib.help();

}

