const mongoose = require('mongoose');
const { addIncomeInfo, getIncomeInfo, updateIncome, getMonthlyIncomeInfo, getSpecificMonthIncome } = require("../services/incomeService");
const { getMonthlyExpenseInfo, getSpecificMonthExpense, addExpenseInfo } = require('../services/expenseService');
const expense = require('../models/expense');

const addIncomeController = async (req,res) =>{
    const currentDate = new Date();
    if(req.body.title === "roomIncome"){
        const incomeInfo = await getIncomeInfo(req.body.listName,currentDate)
        if(incomeInfo.length === 0){
            await addIncomeInfo(req.body.listName, req.body.finalBill, req.body.totalIncome, currentDate)
        }
        else{
            console.log(incomeInfo)
            await updateIncome(incomeInfo[0]._id,req.body.finalBill,req.body.totalIncome)
        }
    }
    else{
        const newIncome = await addIncomeInfo(req.body.listName, null, req.body.totalIncome, req.body.date)
        
        res.json(newIncome)
    }
}

const addExpenseController = async (req,res) =>{
    const newExpense = await addExpenseInfo(req.body.title, req.body.TotalExpense, req.body.date)
    res.json(newExpense)
}

const getMonthlyFinance = async (req,res) =>{
    const incomeData = await getMonthlyIncomeInfo()
    const expenseData = await getMonthlyExpenseInfo()

    const monthlyData = [];
    for (let i = 1; i <= 12; i++) {
        const income = incomeData.find(item => item._id === i)?.totalMonthlyIncome || 0;
        const expense = expenseData.find(item => item._id === i)?.totalMonthlyExpense || 0;
        const profit = income-expense;
        monthlyData.push({ month: i, income, expense, profit });
    }
    res.json(monthlyData);
}

const getSpecificMonthFinance = async(req,res) =>{
    const incomeData = await getSpecificMonthIncome(req.body.month)
    const expenseData = await getSpecificMonthExpense(req.body.month)

    res.json({incomeData, expenseData})
}

module.exports = {addIncomeController,getMonthlyFinance, getSpecificMonthFinance, addExpenseController}