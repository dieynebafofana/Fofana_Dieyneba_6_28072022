const mongoose = require('mongoose');

const SauceSchema = mongoose.Schema({
    userId:{ type: String, required: true},
    name:{ type: String, required: true},
    manufacturer:{ type: String, required: true},
    description:{ type: String, required: true},
    mainPepper:{ type: String, required: true},
    imageUrl:{ type: String, required: true},
    heat:{ type: Number, required: true},
    likes:{ type: Number, default : 0},// default zero
    dislikes:{ type: Number, default : 0},//rechercher comment default zero
    usersliked:{ type: [String], required: false},
    usersdisliked :{type: [String], required: false},

})


module.exports = mongoose.model('Sauce', SauceSchema);