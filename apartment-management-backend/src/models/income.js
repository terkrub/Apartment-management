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