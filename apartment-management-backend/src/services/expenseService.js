const expense = require('../models/expense')

const getMonthlyExpenseInfo = async() =>{
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(`${currentYear}-01-01`);
    const endOfYear = new Date(`${currentYear}-12-31`);

    const expenseData = await expense.aggregate([
        { $match: { date: { $gte: startOfYear, $lte: endOfYear } } },
        { $group: { _id: { $month: "$date" }, totalMonthlyExpense: { $sum: "$TotalExpense" } } },
        { $sort: { _id: 1 } }
    ]);

    return expenseData
}

const getSpecificMonthExpense =async(month) =>{
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, month - 1, 1);
    const endDate = new Date(currentYear, month, 0);
    const expenseData = await expense.aggregate([
      { $match: { date: { $gte: startDate, $lte: endDate } } },
      { $project: { title: 1, TotalIncome: 1, date: 1 } }
    ]);
  
    return expenseData
  
}

const addExpenseInfo = async (title,TotalExpense, date) => {
    const newExpense = new expense({
      'title': title,
      'TotalExpense': TotalExpense,
      'date': date
    })
  
    return newExpense.save()
}
  

module.exports = {getMonthlyExpenseInfo, getSpecificMonthExpense, addExpenseInfo}