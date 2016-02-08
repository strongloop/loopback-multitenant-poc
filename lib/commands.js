var fs = require('fs-extra');
var chalk = require('chalk');
var bold = chalk.bold;

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

var commands = {

  add: function(tenantId) {
    // create tenant files
    var tenantDir = 'tenants/' + tenantId;
    fs.mkdirpSync(tenantDir);
    fs.copySync('template/common', tenantDir);
    fs.copySync('template/tenant', tenantDir);
    console.log('\n Tenant ' + bold(tenantId) +' added.\n Open the directory '+ bold(tenantDir) +' and configure the app manually.\n');
  },

  remove: function(tenantId) {
    var tenantDir = 'tenants/' + tenantId;
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

  model: function(modelAddress) {

    var tenantId = modelAddress.split(':')[0];
    var modelName = modelAddress.split(':')[1];
    var tenantDir = 'tenants/' + tenantId;

    if (fs.existsSync(tenantDir)) {
      var modelDir = tenantDir + '/common/models';
      var modelJsTemplate = fs.readFileSync('template/models/model.js').toString();
      var modelJsonTemplate = fs.readFileSync('template/models/model.json').toString();
      var modelJsPath = modelDir + '/' + modelName.toLowerCase() + '.js';
      var modelJsonPath = modelDir + '/' + modelName.toLowerCase() + '.json';
      fs.mkdirpSync(modelDir);
      fs.createFileSync(modelJsPath);
      fs.createFileSync(modelJsonPath);
      fs.writeFileSync(modelJsPath, modelJsTemplate.replace('#MODEL_NAME#', modelName.capitalizeFirstLetter()));
      fs.writeFileSync(modelJsonPath, modelJsonTemplate.replace('#MODEL_NAME#', modelName));
      console.log('\n Model '+ bold(modelName) + ' created.\n')
    }
    else {
      console.log('\n Tenant '+ bold(tenantId) + ' does not exist.\n')
    }

  },

  help: function() {
    console.log('\n Supported commands: add, remove, start, restart, stop.\n')
  }

}

module.exports = commands;
