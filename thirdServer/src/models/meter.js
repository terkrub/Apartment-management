const {mongoose} = require('../db');
const mongoose1 = require('mongoose');
const Schema = mongoose1.Schema;

const meterSchema = new Schema({
    roomNumber:{
        type: String,
        required: true,
    },
    ElectricMeter:{
        type: Number,
    },
    WaterMeter:{
        type: Number
    },
    date:{
        type: Date
    }
}, {timestamps: false})

const Meter = mongoose.model("MeterInfo", meterSchema);

module.exports = Meter