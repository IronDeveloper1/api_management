var mongoose = require('mongoose')
var mongoUrl = "mongodb://mongodb/phonebook"

var connectWithRetry = function() {
  return mongoose.connect(mongoUrl, function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 1000);
    }
  });
};
connectWithRetry();