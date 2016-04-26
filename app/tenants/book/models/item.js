module.exports = function(Item) {
  Item.feet = function(msg, cb) {
    process.nextTick(function() {
      cb(null, 'I AM BOOK');
    });
  };
};
