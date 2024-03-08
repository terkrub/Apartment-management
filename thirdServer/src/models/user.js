const {mongoose} = require('../db');
const mongoose1 = require('mongoose');
const Schema = mongoose1.Schema;



const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: false})


const User = mongoose.model("User", userSchema);

module.exports = User;