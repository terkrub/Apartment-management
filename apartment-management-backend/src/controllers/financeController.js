const mongoose = require('mongoose');
const { addIncomeInfo, getIncomeInfo, updateIncome, getMonthlyIncomeInfo, getSpecificMonthIncome, deleteIncome, updatePaid } = require("../services/incomeService");
const { getMonthlyExpenseInfo, getSpecificMonthExpense, addExpenseInfo, deleteExpense } = require('../services/expenseService');
const expense = require('../models/expense');

const addIncomeController = async (req,res) =>{
    const currentDate = new Date();
    
    console.log(req.body)
    if(req.body.title === "roomIncome"){
        const incomeInfo = await getIncomeInfo(req.body.listName,currentDate)
        if(incomeInfo.length === 0){
            await addIncomeInfo(req.body.listName, req.body.finalBill, req.body.totalIncome,false, currentDate)
        }
        else{
            console.log(incomeInfo)
            await updateIncome(incomeInfo[0]._id,req.body.finalBill,req.body.totalIncome)
        }
    }
    else{
        const year = currentDate.getFullYear();
        const month = req.body.month.toString().padStart(2, '0');
        const newExpenseDate = new Date(`${year}-${month}-0-15`);
        const newIncome = await addIncomeInfo(req.body.listName, null, req.body.totalIncome,true, newExpenseDate)
        
        res.json(newIncome)
    }
}

const updatePaidController = async(req,res) =>{
    await updatePaid(req.body._id)
    res.json({Status:"Success"})
}

const deleteIncomeController = async (req,res) =>{
    await deleteIncome(req.body.__id)

    res.json({Status:"Success"})
}

const addExpenseController = async (req,res) =>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = req.body.month.toString().padStart(2, '0'); // Ensure month is two digits
    const newExpenseDate = new Date(`${year}-${month}-02`);
    const newExpense = await addExpenseInfo(req.body.title, req.body.TotalExpense, newExpenseDate)
    res.json(newExpense)
}

const deleteExpenseController = async (req,res) =>{
    await deleteExpense(req.body.__id)
    res.json({Status:"Success"})
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



module.exports = {addIncomeController,getMonthlyFinance, getSpecificMonthFinance, addExpenseController, deleteIncomeController, deleteExpenseController, updatePaidController}