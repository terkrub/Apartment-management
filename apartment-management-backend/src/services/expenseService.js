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
    const endDate = new Date(currentYear, month, 0, 23, 59, 59);
    const expenseData = await expense.aggregate([
      { $match: { date: { $gte: startDate, $lte: endDate } } },
      { $project: { title: 1, TotalExpense: 1, date: 1 } }
    ]);
    console.log(expenseData)
    return expenseData
  
}

const addExpenseInfo = async (title,expenseInfo,TotalExpense, date) => {
    const newExpense = new expense({
      'title': title,
      'expenseInfo': expenseInfo,
      'TotalExpense': TotalExpense,
      'date': date
    })
  
    return newExpense.save()
}

const deleteExpense = async (__id) => {
  try {
    await expense.findByIdAndDelete(__id);
  } catch (error) {
    console.error("Error deleting income:", error);
  }
  
}
module.exports = {getMonthlyExpenseInfo, getSpecificMonthExpense, addExpenseInfo, deleteExpense}