var fs = require('fs-extra');
var chalk = require('chalk');
var bold = chalk.bold;

var commands = {

  start: function() {
    console.log('\n Multi-tenant gateway started\n')
  },

  restart: function() {
    console.log('\n Multi-tenant gateway restarted\n')
  },

  stop: function() {
    console.log('\n Multi-tenant gateway stopped\n')
  },

  help: function() {
    console.log('\n Supported commands: start, restart, stop.\n')
  }

}

module.exports = commands;
