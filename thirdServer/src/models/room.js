const {mongoose} = require('../db');
const mongoose1 = require('mongoose');
const Schema = mongoose1.Schema;



const roomSchema = new Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true,
        index: true  
    },
    rentalName: {
        type: String
    },
    rentalPhone:{
        type: String
    },
    totalKey:{
        type: Number,
    },
    startDate:{
        type: Date
    },
    totalDeposit:{
        type: Number
    },
    exitDate:{
        type: Date
    },
    keyExpireDate:{
        type: Date
    },
    available:{
        type: Boolean
    },
    paid:{
        type: Boolean
    },
    roomPrice:{
        type: Number
    },
    passCode: {
        type: String
    }


}, {timestamps: false})


const Room = mongoose.model("RoomInfo", roomSchema);

module.exports = Room;