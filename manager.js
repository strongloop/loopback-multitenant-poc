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

var tenantDir = 'tenants/' + tenantId;
var tenantProcesses = {};

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

  // stop tenant app
  case 'model':
    commandLib.model(argv._[1]);
    break;

  default:
    commandLib.help();

}

// Create a sample app with these requirements: app1 with Customer, Order to mysql, app2 with Customer, Product, Review to mongodb
