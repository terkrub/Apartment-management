const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
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