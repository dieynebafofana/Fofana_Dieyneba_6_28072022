const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email:{ type: String, required: true},
    passeword:{ type: String, required: true},
})


module.exports = mongoose.model('User', UserSchema);
