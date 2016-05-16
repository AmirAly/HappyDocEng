// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Patient', new Schema({
    name: { type: String },
    img: { type: String },
    phone: { type: String },
    dob: { type: String },
    gender: { type: String },
    bio: { type: String },
    history: [{
        text: { type: String },
        type: { type: String },
        date: { type: String },
        attachment: { type: String }
    }]
}));