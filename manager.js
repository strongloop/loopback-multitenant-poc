#! /usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs-extra');
var commandLib = require('./lib/mtm-commands.js');

if (argv._.length < 1) {
  return commandLib.help();
}

var command = argv._[0];

if (argv._.length < 2 && command === 'init') {
  return console.log('\n Usage: mtm %s <app name>\n', command)
}

if (argv._.length < 2) {
  return console.log('\n Usage: mtm %s <tenant name>\n', command)
}

switch (command) {

  // init base LB app
  case 'init':
    var appName = argv._[1].toLowerCase();
    commandLib.init(appName)
    break;

  // add tenant
  case 'add':
    var tenantId = argv._[1].toLowerCase();
    commandLib.add(tenantId)
    break;

  // delete tenant
  case 'remove':
  case 'delete':
    var tenantId = argv._[1].toLowerCase();
    commandLib.remove(tenantId)
    break;

  // add model to tenant app
  case 'model':
    commandLib.model(argv._[1]);
    break;

  default:
    commandLib.help();

}
