import React, { useState, useEffect } from 'react';
import './BillFormStyles.css';
import Dropdown from '../Dropdown.jsx';

const BillForm = ({ otherBill ,setOtherBill, setCurrentMeter, setLastMeter, setRoomInfo, setRoomPrice, roomPrice }) => {
  const options = Array.from({ length: 30 }, (_, i) => (i < 10 ? 101 : i < 20 ? 201 : 301) + (i % 10));
  const billListNames = ['ค่าน้ำ ค่าไฟ', 'ค่าเช่าห้อง', 'อื่นๆ']
  const [selectedOption, setSelectedOption] = useState('');
  const [lastElectricMeter, setLastEletricMeter] = useState('');
  const [lastWaterMeter, setLastWaterMeter] = useState('');
  const [currentEletricMeter, setCurrentEletricMeter] = useState('');
  const [currentWaterMeter, setCurrentWaterMeter] = useState('');
  const [lastMeterDate, setLastMeterDate] = useState('');
  const [currentMeterDate, setCurrentMeterDate] = useState('');
  const [selectedBill, setSelectedBill] = useState('');
  const [otherBillTitle, setOtherBillTitle] = useState('');
  const [otherBillUnit, setOtherBillUnit] = useState('');
  const [otherBillPricePerUnit, setOtherBillPricePerUnit] = useState('');

  const handleSelectBill = (bill) => {
    setSelectedBill(bill);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(selectedBill === 'อื่นๆ'){
        const newItem = { 
            list: otherBillTitle,
            meterPrevious: '',
            meterCurrent: '',
            unit: otherBillUnit,
            pricePerUnit: otherBillPricePerUnit,
            amount: otherBillPricePerUnit * otherBillUnit,
        };
        setOtherBill(prevotherBill => [...prevotherBill, newItem]);
        setOtherBillTitle('')
        setOtherBillUnit('')
        setOtherBillPricePerUnit('')
    }
  }

    
  const handleChange = (e) => {
    const value = e.target.value;
    
        switch (e.target.name) {
        case 'lastElectricMeter':
            setLastEletricMeter(value);
            setLastMeter(prev => ({...prev, ElectricMeter: value}));
            break;
        case 'lastWaterMeter':
            setLastWaterMeter(value);
            setLastMeter(prev => ({...prev, WaterMeter: value}));
            break;
        case 'currentEletricMeter':
            setCurrentEletricMeter(value);
            setCurrentMeter(prev => ({...prev, ElectricMeter: value}));
            break;
        case 'currentWaterMeter':
            setCurrentWaterMeter(value);
            setCurrentMeter(prev => ({...prev, WaterMeter: value}));
            break;
        case 'previousDate':
            setLastMeterDate(value);
            setLastMeter(prev => ({...prev, date: value}));
            break;
        case 'currentDate':
            setCurrentMeterDate(value);
            setCurrentMeter(prev => ({...prev, date: value}));
            break;
        case 'roomPrice':
            setRoomPrice(value)
            break;
        default:
            break;
        }
  };

  useEffect(() => {
    if (!selectedOption) return; 

  }, [selectedOption]);

  

  return (
    <div className='meterForm-container'>
      <form onSubmit={handleSubmit}>
        <label>เลือกห้อง:</label>
        <Dropdown id="dropdown" options={options} onSelect={handleSelect} title={"เลือกห้อง"}/>
        <input type="hidden" name="selectedOption" value={selectedOption}/>

        <label>รายการ:</label>
        <Dropdown 
          id="dropdown" 
          options={billListNames} 
          onSelect={handleSelectBill} 
          title={"เลือกรายการ"}
        />
        <input type="hidden" name="selectedOption" value={selectedOption}/>

        {selectedBill === 'ค่าน้ำ ค่าไฟ' &&(
          <>
            <label>มิตเตอร์น้ำก่อนหน้า:</label>
            <input type='number' name='lastWaterMeter' value={lastWaterMeter} onChange={handleChange} required></input>
            <label>มิตเตอร์ไฟก่อนหน้า:</label>
            <input type='number' name='lastElectricMeter' value={lastElectricMeter} onChange={handleChange} required></input>
            <label>วันที่จดบันทึกก่อนหน้า:</label>
            <input type='date' name='previousDate' value={lastMeterDate} onChange={handleChange} placeholder="dd/mm/yyyy" required></input>

            <label>มิตเตอร์น้ำปัจจุบัน:</label>
            <input type='number' name='currentWaterMeter' value={currentWaterMeter} onChange={handleChange} required></input>
            <label>มิตเตอร์ไฟปัจจุบัน:</label>
            <input type='number' name='currentEletricMeter' value={currentEletricMeter} onChange={handleChange} required></input>
            <label>วันที่จดบันทึกปัจจุบัน:</label>
            <input type='date' name='currentDate' value={currentMeterDate} onChange={handleChange} placeholder="dd/mm/yyyy" required></input>

          </>
        )}

        {selectedBill === 'ค่าเช่าห้อง' &&(
          <>
            <label>ราคาค่าเช่า:</label>
            <input type='number' name='roomPrice' value={roomPrice} onChange={handleChange} required></input>
            
          </>
        )}

        {selectedBill === 'อื่นๆ' &&(
          <>
            <label>ชื่อรายการ:</label>
            <input  name='title' value={otherBillTitle} onChange={(e)=>{setOtherBillTitle(e.target.value)}} required></input>

            <label>จำนวน:</label>
            <input type='number' name='unit' value={otherBillUnit} onChange={(e)=>{setOtherBillUnit(e.target.value)}} required></input>

            <label>ราคาต่อหน่วย:</label>
            <input type='number' name='PricePerunit' value={otherBillPricePerUnit} onChange={(e)=>{setOtherBillPricePerUnit(e.target.value)}} required></input>
            
          </>
        )}
    
      
        <button type="submit">บันทึก</button>
      </form>
    </div>
  );
}

export default BillForm;