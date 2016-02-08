#! /usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs-extra');
var commandLib = require('./lib/commands.js');

if (argv._.length < 1) {
  return commandLib.help();
}

var command = argv._[0];

if (argv._.length < 2) {
  return console.log('\n Usage: mt %s <tenant id>\n', command)
}

var tenantId = argv._[1].toLowerCase();
var tenantDir = 'tenants/' + tenantId;
var tenantProcesses = {};

// this is where all the tenant apps will reside
fs.mkdirpSync('tenants/');

switch (command) {

  // add tenant
  case 'add':
    commandLib.add(tenantId, tenantDir)
    break;

  // delete tenant
  case 'remove':
  case 'delete':
    commandLib.remove(tenantId, tenantDir)
    break;

  // start tenant app
  case 'start':
    commandLib.start(tenantId, tenantDir)
    break;

  // restart tenant app
  case 'restart':
    commandLib.restart(tenantId, tenantDir)
    break;

  // stop tenant app
  case 'stop':
    commandLib.stop(tenantId, tenantDir)
    break;

  default:
    commandLib.help();

}

// Create a sample app with these requirements: app1 with Customer, Order to mysql, app2 with Customer, Product, Review to mongodb
