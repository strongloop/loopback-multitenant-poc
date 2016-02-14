var fs = require('fs-extra');
var chalk = require('chalk');
var bold = chalk.bold;
var YAML = require('yamljs');

// create tenant port number file, if not there already
fs.ensureFileSync('tenant-port-numbers.yml');

var tenantPortNumber = YAML.load('tenant-port-numbers.yml');

// watch the tenant port number file for changes
fs.watch('tenant-port-numbers.yml', function (event, filename) {
  if (event === 'change') {
    tenantPortNumber = YAML.load('tenant-port-numbers.yml');
  }
});

var tenantProcesses = {};

var commands = {

  start: function() {

    // start all the tenants
    console.log('\n Starting tenants ... \n');
    Object.keys(tenantPortNumber).forEach(function (tenantId) {

    });
    // start the gateway
    console.log('\n Starting gateway ... \n');

    console.log('\n Multi-tenant gateway started.\n');
  },

  restart: function() {
    console.log('\n Multi-tenant gateway restarted.\n');
  },

  stop: function() {
    console.log('\n Multi-tenant gateway stopped.\n');
  },

  help: function() {
    console.log('\n Supported commands: start, restart, stop.\n');
    process.exit();
  }

}

module.exports = commands;
