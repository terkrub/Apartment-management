const mongoose = require('../db');
const mongoose1 = require('mongoose');
const Schema = mongoose1.Schema;

const itemSchema = new mongoose1.Schema({
    list: String,
    meterPrevious: String,
    meterCurrent: String,
    unit: Number,
    pricePerUnit: Number,
    amount: Number
});

const incomeSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    IncomeInfo:{
        type: [itemSchema],
    },
    TotalIncome:{
        type: Number
    },
    paid:{
        type: Boolean
    },
    date:{
        type: Date
    }
}, {timestamps: false})

const Income = mongoose.model("IncomeInfo", incomeSchema);

module.exports = Income