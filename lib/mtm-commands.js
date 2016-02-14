var fs = require('fs-extra');
var chalk = require('chalk');
var bold = chalk.bold;
var generatePortNumber = require('./port-number-generator.js');

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

// create tenant port number file, if not there already
fs.ensureFileSync('tenant-port-numbers.yml');

var commands = {

  add: function(tenantId) {

    // create tenant files
    var tenantDir = 'tenants/' + tenantId;

    if (fs.existsSync(tenantDir)) {
      return console.log(chalk.red('\n Tenant ' + bold(tenantId) + ' already exists.\n'));
    }

    fs.mkdirpSync(tenantDir);
    fs.copySync('template/common', tenantDir);
    fs.copySync('template/tenant', tenantDir);

    // generate a port number for the tenant app
    generatePortNumber(tenantId);

    console.log('\n Tenant ' + bold(tenantId) + ' added.\n Open the directory '+ bold(tenantDir) +' and configure the app manually.\n');
  },

  remove: function(tenantId) {
    var tenantDir = 'tenants/' + tenantId;

    if (!fs.existsSync(tenantDir)) {
      return console.log(chalk.red('\n Tenant ' + bold(tenantId) + ' not found.\n'));
    }

    // stop tenant process

    // delete tenant files
    fs.removeSync(tenantDir);
    console.log('\n Tenant '+ bold(tenantId) +' removed.\n');
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
      var modelDir = tenantDir + '/models';
      var modelJsTemplate = fs.readFileSync('template/models/model.js').toString();
      var modelJsonTemplate = fs.readFileSync('template/models/model.json').toString();
      var modelJsPath = modelDir + '/' + modelName + '.js';
      var modelJsonPath = modelDir + '/' + modelName + '.json';
      var modelConfigPath = tenantDir + '/model-config.json';

      // create the model files
      fs.mkdirpSync(modelDir);
      fs.createFileSync(modelJsPath);
      fs.createFileSync(modelJsonPath);
      fs.writeFileSync(modelJsPath, modelJsTemplate.replace('#MODEL_NAME#', modelName.capitalizeFirstLetter()));
      fs.writeFileSync(modelJsonPath, modelJsonTemplate.replace('#MODEL_NAME#', modelName));

      // append model to model config file
      var modelConfigObject = JSON.parse(fs.readFileSync(modelConfigPath).toString());
      modelConfigObject[modelName] = {
        "dataSource": "db", "public": true
      };

      fs.outputJSONSync(modelConfigPath, modelConfigObject);

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
