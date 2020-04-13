const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MessageSchema = new Schema({
    messageText: {type: String, required: true, max: 100, unique: true},
    dialogID: {type: String, required: true},
    senderID: {type: String},
    messageTime: {type: String, required: true}
});

module.exports = mongoose.model('Message', MessageSchema);