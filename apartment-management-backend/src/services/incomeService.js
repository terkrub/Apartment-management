const mongoose = require('mongoose');
const Income = require('../models/income')

const addIncomeInfo = async (roomNumber, IncomeInfo,TotalIncome) => {
    const currentDate = new Date();
    const IncomeBill = new Income({
      'title': roomNumber,
      'IncomeInfo': IncomeInfo,
      'TotalIncome': TotalIncome,
      'paid': true,
      'date': currentDate
    })
  
    return IncomeBill.save()
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

 
  

module.exports = {addIncomeInfo, getIncomeInfo}