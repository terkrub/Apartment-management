const {mongoose} = require('../db');
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

const expenseSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    expenseInfo:{
        type: [itemSchema],
    },
    TotalExpense:{
        type: Number
    },
    date:{
        type: Date
    }
}, {timestamps: false})

const expense = mongoose.model("ExpenseInfo", expenseSchema);

module.exports = expense