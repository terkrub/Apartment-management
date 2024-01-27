const mongoose = require('mongoose');
const Income = require('../models/income')

const addIncomeInfo = async (roomNumber, IncomeInfo,TotalIncome, date) => {
    const IncomeBill = new Income({
      'title': roomNumber,
      'IncomeInfo': IncomeInfo,
      'TotalIncome': TotalIncome,
      'paid': false,
      'date': date
    })
  
    return IncomeBill.save()
}

const deleteIncome = async (__id) => {
  try {
    await Income.findByIdAndDelete(__id);
  } catch (error) {
    console.error("Error deleting income:", error);
  }
}


const getIncomeInfo = async (roomNumber, date) => {
    const Month = new Date(date.getFullYear(), date.getMonth())
    const targetMonth = Month.getMonth() + 1
    const targetYear = Month.getFullYear()

    const IncomeInfo = Income.find({
        title: roomNumber,
      $expr: {
        $and: [
          { $eq: [{ $month: '$date' }, targetMonth] },
          { $eq: [{ $year: '$date' }, targetYear] }
        ]
      }
    })
  
    return IncomeInfo
}

const updateIncome = async (id,finalBill, total)=>{
  const incomeInfo = await Income.findOneAndUpdate({_id: id}, {IncomeInfo: finalBill, TotalIncome: total}, {new: true})
  return incomeInfo
}

const getMonthlyIncomeInfo = async() =>{
  try {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(`${currentYear}-01-01`);
    const endOfYear = new Date(`${currentYear}-12-31`);
    
    const incomeData = await Income.aggregate([
      { $match: { date: { $gte: startOfYear, $lte: endOfYear } } },
      { $group: { _id: { $month: "$date" }, totalMonthlyIncome: { $sum: "$TotalIncome" } } },
      { $sort: { _id: 1 } }
    ]);

    return incomeData
} catch (error) {
    res.status(500).send('Server error');
}
}

const getSpecificMonthIncome =async(month) =>{
  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, month - 1, 1);
  const endDate = new Date(currentYear, month, 0);
  const incomeData = await Income.aggregate([
    { $match: { date: { $gte: startDate, $lte: endDate } } },
    { $project: { title: 1, TotalIncome: 1, date: 1 } }
  ]);

  return incomeData

}

 
  

module.exports = {addIncomeInfo, getIncomeInfo, updateIncome, getMonthlyIncomeInfo, getSpecificMonthIncome, deleteIncome}