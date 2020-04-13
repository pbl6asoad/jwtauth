const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    login: {type: String, required: true, max: 100, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    img: {type: String, required: true},
    authType: {type: String, required: true},
    dialogs : {type: Array}
});

module.exports = mongoose.model('User', UserSchema);