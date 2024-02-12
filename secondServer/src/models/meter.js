const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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