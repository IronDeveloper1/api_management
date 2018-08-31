var mongoose = require('mongoose');
var mongoUrl = process.env.DB_URI;
//var mongoUrl = "mongodb://127.0.0.1:27017/phonebook"

var connectWithRetry = function() {
  return mongoose.connect(mongoUrl, function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 1000);
    }
  });
};
connectWithRetry();