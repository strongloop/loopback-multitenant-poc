module.exports = function(Planet) {
  Planet.feet = function(msg, cb) {
    process.nextTick(function() {
      cb(null, 'I AM APPLE');
    });
  };
};
