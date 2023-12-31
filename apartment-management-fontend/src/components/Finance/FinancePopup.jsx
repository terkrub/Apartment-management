import React, { useState } from 'react';
import './FinancePopupStyles.css'
import StatIcon from '../icon/StatIcon';

const FinanceInfoPopup = ({month, setMonthSelected}) => {
  const [optionSelected,setOptionSelected] = useState(null)
    /*[
        {
          list: 'ค่าน้ำ (ขั้นต่ำ 50 บาท)',
          meterPrevious: lastMeter?lastMeter.WaterMeter:'',
          meterCurrent: currentMeter?currentMeter.WaterMeter:'',
          unit: currentMeter&&lastMeter?currentMeter.WaterMeter-lastMeter.WaterMeter:'',
          pricePerUnit: 18,
          amount: currentMeter && lastMeter ? Math.max(50, (currentMeter.WaterMeter - lastMeter.WaterMeter) * 18)  : 50,
        },
        {
          list: 'ค่าไฟ',
          meterPrevious: lastMeter?lastMeter.ElectricMeter:'',
          meterCurrent: currentMeter?currentMeter.ElectricMeter:'',
          unit: currentMeter&&lastMeter?currentMeter.ElectricMeter-lastMeter.ElectricMeter:'',
          pricePerUnit: 9,
          amount: currentMeter&&lastMeter?(currentMeter.ElectricMeter-lastMeter.ElectricMeter)*9 >0 ?(currentMeter.ElectricMeter-lastMeter.ElectricMeter)*9 :0:'',
        },
        {
          list: 'ค่าเช่าห้อง',
          meterPrevious: '',
          meterCurrent: '',
          unit: 1,
          pricePerUnit: roomPrice,
          amount: roomPrice * 1,
        },
      ]
    */
  return (
    <div className="popup">
      <div className="popup-content">
        <div className='closeBtn' onClick={()=>{setMonthSelected(null)}} style={{ cursor: 'pointer' }}>
            <StatIcon.CloseIcon />
        </div>
        {!optionSelected&&
        <>
          <h2> รายรับรายจ่ายเดือน {month}</h2>
          <div className='optionContainer'>
            <button className='addIncomeBtn' onClick={()=>{setOptionSelected('addIncome')}}>เพิ่มรายรับ</button>
            <button className='addExpenseBtn' onClick={()=>{setOptionSelected('addExpense')}}>เพิ่มรายจ่าย</button>
          </div>
        </>
        }
        {optionSelected ==='addIncome'&&
          <>
            <h2> รายรับเดือน {month}</h2>
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
                    <tr>
                        <td>test1</td>
                        <td>xxx บาท</td>
                    </tr>
                    <tr>
                        <td>test2</td>
                        <td>xxx บาท</td>
                    </tr>
                    <tr>
                        <td>test3</td>
                        <td>xxx บาท</td>
                    </tr>
                    <tr>
                        <td>test3</td>
                        <td>xxx บาท</td>
                    </tr>
                    <tr>
                        <td>test3</td>
                        <td>xxx บาท</td>
                    </tr>
                    <tr>
                        <td>test3</td>
                        <td>xxx บาท</td>
                    </tr>
                    <tr>
                        <td>test3</td>
                        <td>xxx บาท</td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              <form>
                  <label>ชื่อรายการ:</label>
                  <input type="text"/>

                  <label>รายรับสุทธิ:</label>
                  <input type="number"/>
                  <button type="submit" className='saveBtn'>บันทึก</button>
                  <button type="button" className='backBtn' onClick={()=>{setOptionSelected(null)}}>กลับ</button>
              </form>
            </div>
          </>

        }
        {optionSelected ==='addExpense'&&
          <>
          <h2> รายจ่ายเดือน {month}</h2>
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
                  <tr>
                      <td>test1</td>
                      <td>xxx บาท</td>
                  </tr>
                  <tr>
                      <td>test2</td>
                      <td>xxx บาท</td>
                  </tr>
                  <tr>
                      <td>test3</td>
                      <td>xxx บาท</td>
                  </tr>
                  <tr>
                      <td>test3</td>
                      <td>xxx บาท</td>
                  </tr>
                  <tr>
                      <td>test3</td>
                      <td>xxx บาท</td>
                  </tr>
                  <tr>
                      <td>test3</td>
                      <td>xxx บาท</td>
                  </tr>
                  <tr>
                      <td>test3</td>
                      <td>xxx บาท</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
            <form>
                <label>ชื่อรายการ:</label>
                <input type="text"/>

                <label>รายจ่ายสุทธิ:</label>
                <input type="number"/>
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