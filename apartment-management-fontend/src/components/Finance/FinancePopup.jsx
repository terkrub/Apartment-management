import React, { useState,useEffect } from 'react';
import './FinancePopupStyles.css'
import StatIcon from '../icon/StatIcon';
import axios from "../../api/axios"

const FinanceInfoPopup = ({month, setMonthSelected, fetchFinanceData}) => {
  const [optionSelected,setOptionSelected] = useState(null)
  const [incomeData,setIncomeData] = useState([])
  const [expenseData,setExpenseData] = useState([]) 
  const [newIncome, setNewIncome] = useState({ title: '', TotalIncome: 0 });
  const [newExpense, setNewExpense] = useState({ title: '', TotalExpense: 0 });
  const currentYear = new Date().getFullYear();
  const months_th_mini = [ "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค." ];
  
  useEffect(() => {
    const token = localStorage.getItem('token')
        axios.post('/specific-month-finance',{ month },{
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
          .then(res => {
            setIncomeData(res.data.incomeData)
            setExpenseData(res.data.expenseData)
          })
          .catch(err => console.error(err))
  }, [month]);

  const handleAddIncome = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    axios.post('/addIncome', {title: "Income",listName: newIncome.title, totalIncome: newIncome.TotalIncome, month: month}, {
      headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
      },
      withCredentials: true
      })
      .then(res => {
        setIncomeData([...incomeData, res.data]);
        setNewIncome({ title: '', TotalIncome: 0 }); // Reset form
        fetchFinanceData()
      })
      .catch(err => console.error(err))

  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    axios.post('/addExpense', {title: newExpense.title, TotalExpense: newExpense.TotalExpense, month: month}, {
      headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
      },
      withCredentials: true
      })
      .then(res => {
        setExpenseData([...expenseData, res.data]);
        setNewExpense({ title: '', TotalExpense: 0 });
        fetchFinanceData()
      })
      .catch(err => console.error(err))
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <div className='closeBtn' onClick={()=>{setMonthSelected(null)}} style={{ cursor: 'pointer' }}>
            <StatIcon.CloseIcon />
        </div>
        {!optionSelected&&
        <>
          <h2> รายรับรายจ่ายเดือน {months_th_mini[month-1]}</h2>
          <div className='optionContainer'>
            <button className='addIncomeBtn' onClick={()=>{setOptionSelected('addIncome')}}>เพิ่มรายรับ</button>
            <button className='addExpenseBtn' onClick={()=>{setOptionSelected('addExpense')}}>เพิ่มรายจ่าย</button>
          </div>
        </>
        }
        {optionSelected ==='addIncome'&&
          <>
            <h2> รายรับเดือน {months_th_mini[month-1]}</h2>
            <div className='addIncomeContainer'>
              <div className='incomeTableContainer'>
                <table className='incomeTable'>
                  <thead>
                      <tr>
                      <th>ชื่อรายการ</th>
                      <th>รายรับสุทธิ</th>
                      </tr>
                  </thead>
                  <tbody>
                    {incomeData.map((income) =>(
                      <tr key={income._id}>
                        <td>{income.title}</td>
                        <td>{income.TotalIncome}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <form onSubmit={handleAddIncome}>
                  <label>ชื่อรายการ:</label>
                  <input
                    type="text"
                    value={newIncome.title}
                    onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })}
                  />
                  <label>รายรับสุทธิ:</label>
                  <input
                    type="number"
                    value={newIncome.TotalIncome}
                    onChange={(e) => setNewIncome({ ...newIncome, TotalIncome: e.target.value })}
                  />
                  <button type="submit" className='saveBtn'>บันทึก</button>
                  <button type="button" className='backBtn' onClick={()=>{setOptionSelected(null)}}>กลับ</button>
              </form>
            </div>
          </>

        }
        {optionSelected ==='addExpense'&&
          <>
          <h2> รายจ่ายเดือน {months_th_mini[month-1]}</h2>
          <div className='addIncomeContainer'>
            <div className='incomeTableContainer'>
              <table className='incomeTable'>
                <thead>
                    <tr>
                    <th>ชื่อรายการ</th>
                    <th>รายจ่ายสุทธิ</th>
                    </tr>
                </thead>
                <tbody>
                {expenseData.map((expense) =>(
                      <tr key={expense._id}>
                        <td>{expense.title}</td>
                        <td>{expense.TotalExpense}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <form onSubmit={handleAddExpense}>
                <label>ชื่อรายการ:</label>
                <input
                  type="text"
                  value={newExpense.title}
                  onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                />

                <label>รายจ่ายสุทธิ:</label>
                <input
                  type="number"
                  value={newExpense.TotalExpense}
                  onChange={(e) => setNewExpense({ ...newExpense, TotalExpense: e.target.value })}
                />
                <button type="submit" className='saveBtn'>บันทึก</button>
                <button type="button" className='backBtn' onClick={()=>{setOptionSelected(null)}}>กลับ</button>
            </form>
          </div>
        </>
        }

      </div>
    </div>
  );
};

export default FinanceInfoPopup;