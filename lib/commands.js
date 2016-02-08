var fs = require('fs-extra');
var chalk = require('chalk');
var bold = chalk.bold;
var commands = {

  add: function(tenantId, tenantDir) {
    // create tenant files
    fs.mkdirpSync(tenantDir);
    fs.copySync('template/common', tenantDir);
    fs.copySync('template/tenant', tenantDir);
    console.log('\n Tenant ' + bold(tenantId) +' added.\n Open the directory '+ bold(tenantDir) +' and configure the app manually.\n');
  },

  remove: function(tenantId, tenantDir) {
    // stop tenant process

    // delete tenant files
    fs.removeSync(tenantDir);
    console.log('\n Tenant '+ bold(tenantId) +' removed\n');
  },

  start: function(tenantId, tenantDir) {

  },

  restart: function(tenantId, tenantDir) {

  },

  stop: function(tenantId) {

  },

  help: function() {
    console.log('\n Supported commands: add, remove, start, restart, stop.\n')
  }

}

module.exports = commands;
