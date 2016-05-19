// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    name: { type: String },
    email: { type: String, require: 'Please enter email' },
    password: { type: String, require: 'Please enter password' },
    phone: { type: String },
    img:{ type: String },
    fbid: { type: String }
}));