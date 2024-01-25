const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const expenseSchema = new Schema({
    title:{
        type: String,
        required: true,
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