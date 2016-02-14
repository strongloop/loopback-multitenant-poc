var fs = require('fs-extra');
var chalk = require('chalk');
var bold = chalk.bold;
var YAML = require('yamljs');
var fork = require('child_process').fork;
var http = require('http');
var httpProxy = require('http-proxy');

// create tenant port number file, if not there already
fs.ensureFileSync('tenant-port-numbers.yml');

var tenantPortNumbers = YAML.load('tenant-port-numbers.yml');

// watch the tenant port number file for changes
fs.watch('tenant-port-numbers.yml', function (event, filename) {
  if (event === 'change') {
    tenantPortNumbers = YAML.load('tenant-port-numbers.yml');
  }
});

var tenantProcesses = {};

var commands = {

  start: function() {

    // start all the tenants
    console.log('\n Starting tenants\n');
    Object.keys(tenantPortNumbers).forEach(function (tenantId) {
      var tenantPath = 'tenants/' + tenantId + '/server.js';
      var child = fork(tenantPath);
      tenantProcesses[tenantId] = child.pid;

      console.log(' Tenant Id:', chalk.bold(tenantId));
      console.log(' PID:', chalk.bold(child.pid));
      console.log(' Address:', chalk.bold('http://0.0.0.0:' + tenantPortNumbers[tenantId]));
      console.log();

    });

    // start the gateway
    var proxy = httpProxy.createProxyServer({});
    var server = http.createServer(function(req, res) {

      var urlSegments = req.url.split('/');

      if (urlSegments.length === 2 && urlSegments[1] === '') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        return res.end('<b>Welcome to multi-tenant LoopBack</b>');
      }

      var tenantId = urlSegments[1];
      if (!(tenantId in tenantPortNumbers)) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        return res.end('Tenant not found');
      }

      var tenantPort = tenantPortNumbers[tenantId];
      var tenantAppHost = 'http://0.0.0.0:' + tenantPort;
      req.url = req.url.replace('/' + tenantId, '');

      // FIX: /explorer is redirecting the request
      // access it from the individual apps for now

      proxy.web(req, res, { target: tenantAppHost });

    })

    var gatewayPort = 9000;
    server.listen(gatewayPort);
    console.log('\n Gateway listening at http://localhost:%d', gatewayPort);

  },

  restart: function() {
    console.log('\n Gateway restarted.\n');
  },

  stop: function() {
    console.log('\n Gateway stopped.\n');
  },

  help: function() {
    console.log('\n Supported commands: start, restart, stop.\n');
    process.exit();
  }

}

module.exports = commands;
