var loopback = require('loopback');
var boot = require('loopback-boot');
var chalk = require('chalk');
var bold = chalk.bold;
var gray = chalk.gray;

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// mount the sub apps
var fs = require('fs');
var path = require('path');

var tenantsDir = path.join(__dirname, '..', 'tenants');
if (fs.existsSync(tenantsDir)) {
  process.stdout.write(' ' + gray('Loading tenants: '));
  fs.readdirSync(tenantsDir).forEach(function (dir) {
    var tenantDir = path.join(__dirname, '..', 'tenants', dir);
    var stats = fs.statSync(tenantDir);
    if (stats.isDirectory()) {
      var tenantPath = '/' + dir;
      app.use(tenantPath, require(tenantDir));
      process.stdout.write(dir + ' ')
    }
  });
  process.stdout.write(bold('DONE') + '\n');
}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
