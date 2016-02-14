var fs = require('fs-extra');

// create tenant port number file, if not there already
fs.ensureFileSync('tenant-port-numbers.yml');

var YAML = require('yamljs');
var tenantPortNumbers = YAML.load('tenant-port-numbers.yml');

// starting port number for tenant apps
var startingPortNumber = 10000;

module.exports = function (tenantId) {

  var portNumber = startingPortNumber;

  if (tenantPortNumbers) {
    var tenants = Object.keys(tenantPortNumbers);
    var lastTenant = tenants[tenants.length -1];
    portNumber = +tenantPortNumbers[lastTenant] + 1;
  }

  var tenantEntry = tenantId + ': ' + portNumber + '\n';
  fs.appendFileSync('tenant-port-numbers.yml', tenantEntry);

  return portNumber;

};
