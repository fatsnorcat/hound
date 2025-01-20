const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: String,
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    tokens: [{type: Object}]

})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel