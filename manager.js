#! /usr/bin/env node
// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: multitenancy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs-extra');
var commandLib = require('./lib/mtm-commands.js');

if (argv._.length < 1) {
  return commandLib.help();
}

var command = argv._[0];

if (argv._.length < 2) {
  return console.log('\n Usage: mtm %s <tenant id>\n', command)
}

var tenantDir = 'tenants/' + tenantId;

// this is where all the tenant apps will reside
fs.mkdirpSync('tenants/');

switch (command) {

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

  // start tenant app
  case 'start':
    var tenantId = argv._[1].toLowerCase();
    commandLib.start(tenantId)
    break;

  // restart tenant app
  case 'restart':
    var tenantId = argv._[1].toLowerCase();
    commandLib.restart(tenantId)
    break;

  // stop tenant app
  case 'stop':
    var tenantId = argv._[1].toLowerCase();
    commandLib.stop(tenantId)
    break;

  // add model to tenant app
  case 'model':
    commandLib.model(argv._[1]);
    break;

  default:
    commandLib.help();

}
