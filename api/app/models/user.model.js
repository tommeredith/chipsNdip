const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    hand: [{suit: String, rank: Number}]
})

module.exports = mongoose.model('User', UserSchema)