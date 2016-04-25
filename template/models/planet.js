module.exports = function(Planet) {
  Planet.greet = function(msg, cb) {
    process.nextTick(function() {
      msg = msg || 'world';
      cb(null, 'Hello ' + msg);
    });
  };
};
