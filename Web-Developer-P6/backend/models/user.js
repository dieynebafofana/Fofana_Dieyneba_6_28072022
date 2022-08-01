const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    email:{ type: string, required: true},
    passeword:{ type: string, required: true},
})

bcrypt.hash(UserSchema.passeword);

module.exports = mongoose.model('user', UserSchema);