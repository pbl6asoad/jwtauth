const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DialogSchema = new Schema({
    dialogID: {type: String, required: true, unique: true},
    User1: {type: String, required: true},
    User2: {type: String, required: true}
});

module.exports = mongoose.model('Dialog', DialogSchema);