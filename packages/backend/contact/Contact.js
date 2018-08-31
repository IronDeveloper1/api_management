var mongoose = require('mongoose');
var ContactSchema = new mongoose.Schema({
    name: String,
    numbers: [{
        number: String,
        description: String,
        classification: String
    }]
});
mongoose.model('Contact', ContactSchema);

module.exports = mongoose.model('Contact');