var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website: ,
    name: String,
    title: String,
    description: String,
    widgets: ,
    dateCreated: Date
});

module.exports = pageSchema;
