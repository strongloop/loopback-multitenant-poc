var path = require('path');
var fs = require('fs-extra');
var chalk = require('chalk');
var bold = chalk.bold;

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

var templateDir = path.join(__dirname, '..', 'template');

var commands = {

  // before anything else, call this, it will create the base LB app, where we add the tenants
  init: function (appName) {
    var baseAppDir = appName;
    if (fs.existsSync(baseAppDir)) {
      console.log('\n ' + bold(appName) + ' already exists\n');
    } else {
      // create basic LB files
      fs.mkdirpSync(baseAppDir);
      fs.copySync(path.join(templateDir, 'base-app'), baseAppDir);

      // update package.json
      var packageFilePath = path.join(baseAppDir, 'package.json');
      var packageFileContent = fs.readFileSync(packageFilePath).toString();
      packageFileContent = packageFileContent.replace('#APP_NAME#', appName);
      fs.writeFileSync(packageFilePath, packageFileContent);

      console.log('\n Base LoopBack app '+ bold(appName) +' initialized\n');
    }
  },

  add: function(tenantId) {

    // create tenant files
    var tenantDir = path.join('tenants', tenantId);
    if (fs.existsSync(tenantDir)) {
      return console.log(chalk.red('\n Tenant ' + bold(tenantId) + ' already exists.\n'));
    }

    fs.mkdirpSync(tenantDir);
    fs.copySync(path.join(templateDir, 'sub-app'), tenantDir);

    // update package.json
    var packageFilePath = path.join(tenantDir, 'package.json');
    var packageFileContent = fs.readFileSync(packageFilePath).toString();
    packageFileContent = packageFileContent.replace('#APP_NAME#', tenantId);
    fs.writeFileSync(packageFilePath, packageFileContent);

    console.log('\n Tenant ' + bold(tenantId) + ' added.\n Open the directory '+ bold(tenantDir) +' and configure the app manually.\n');
  },

  remove: function(tenantId) {

    var tenantDir = path.join('tenants', tenantId);
    if (!fs.existsSync(tenantDir)) {
      return console.log(chalk.red('\n Tenant ' + bold(tenantId) + ' not found.\n'));
    }

    // delete tenant files
    fs.removeSync(tenantDir);
    console.log('\n Tenant '+ bold(tenantId) +' removed.\n');
  },

  model: function(modelAddress) {

    var tenantId = modelAddress.split(':')[0];
    var modelName = modelAddress.split(':')[1];
    var tenantDir = path.join('tenants', tenantId);

    if (fs.existsSync(tenantDir)) {
      var modelDir = path.join(tenantDir, 'models');
      var modelJsTemplate = fs.readFileSync(path.join(templateDir, 'models', 'model.js')).toString();
      var modelJsonTemplate = fs.readFileSync(path.join(templateDir, 'models', 'model.json')).toString();
      var modelJsPath = path.join(modelDir, modelName + '.js');
      var modelJsonPath = path.join(modelDir, modelName + '.json');
      var modelConfigPath = path.join(tenantDir, 'server', 'model-config.json');

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

      console.log('\n Model '+ bold(modelName) + ' created for '+ bold(tenantId) +'.\n')
    }
    else {
      console.log('\n Tenant '+ bold(tenantId) + ' does not exist.\n')
    }

  },

  help: function() {
    console.log('\n Supported commands: add, remove, start, restart, stop, model.\n')
  }

}

module.exports = commands;
