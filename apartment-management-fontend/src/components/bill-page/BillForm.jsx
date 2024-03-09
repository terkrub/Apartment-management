import React, { useState, useEffect } from 'react';
import './BillFormStyles.css';
import Dropdown from '../Dropdown.jsx';
import axios from '../../api/axios.jsx'
import DigitalMeter from './DigitalMeter.jsx';
import MeterLastClean from './MeterLastClean.jsx';

const BillForm = ({billOption,setBillOption, generatePdf, handlegenerateBill, otherBill ,setOtherBill, setCurrentMeter, setLastMeter, setRoomInfo, setRoomPrice, roomPrice }) => {
  const branch = localStorage.getItem('branch') === "LaithongResort";

  const options = branch 
    ? [
        ...Array.from({ length: 16 }, (_, i) => `A${i + 1}`),
        ...Array.from({ length: 16 }, (_, i) => `B${i + 1}`),
        ...Array.from({ length: 31 }, (_, i) => `C${i + 1}`),
      ]
    : Array.from({ length: 30 }, (_, i) => (i < 10 ? 101 : i < 20 ? 201 : 301) + (i % 10));


  const [billListNames, setbillListNames] = useState([])
  const [selectedOption, setSelectedOption] = useState('');
  const [lastElectricMeter, setLastEletricMeter] = useState('');
  const [lastWaterMeter, setLastWaterMeter] = useState('');
  const [currentEletricMeter, setCurrentEletricMeter] = useState('');
  const [currentWaterMeter, setCurrentWaterMeter] = useState('');
  const [EletricMeter, setEletricMeter] = useState('');
  const [WaterMeter, setWaterMeter] = useState('');
  const [lastMeterDate, setLastMeterDate] = useState('');
  const [currentMeterDate, setCurrentMeterDate] = useState('');
  const [selectedBill, setSelectedBill] = useState('');
  const [otherBillTitle, setOtherBillTitle] = useState('');
  const [otherBillUnit, setOtherBillUnit] = useState('');
  const [otherBillPricePerUnit, setOtherBillPricePerUnit] = useState('');
  useEffect(()=>{
    if(billOption==="ใบเเจ้งหนี้/ใบเสร็จรับเงิน"){
      setbillListNames(['ค่าน้ำ ค่าไฟ', 'ค่าเช่าห้อง', 'อื่นๆ'])
    }
    else if(billOption==="บิลแรกเข้า"){
      setbillListNames(['ค่าเช่าห้อง'])
    }
    else if(billOption==="มิตเตอร์หลังทำความสะอาด"){
      setbillListNames(['มิตเตอร์น้ำ ไฟ'])
    }
    else{
      setbillListNames(['ค่าน้ำ ค่าไฟ', 'อื่นๆ'])
    }
  },[billOption])
  useEffect(() => {
    if (!selectedOption) return; 
    
    setEletricMeter('')
    setWaterMeter('')
    
    axios.post('/MeterInfo', { roomNumber: selectedOption }, { 
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
      .then(res => {
        setRoomInfo(res.data.roomInfo.room[0])
        setRoomPrice(res.data.roomInfo.room[0].roomPrice)
        setCurrentMeter(res.data.currentMeterResult[0] || {ElectricMeter: "", WaterMeter: ""});
        setCurrentEletricMeter(res.data.currentMeterResult[0]?res.data.currentMeterResult[0].ElectricMeter:"")
        setCurrentWaterMeter(res.data.currentMeterResult[0]?res.data.currentMeterResult[0].WaterMeter:"")


        if (res.data.currentMeterResult[0] && res.data.currentMeterResult[0].date) {
          const currentMeterDateFormatted = new Date(res.data.currentMeterResult[0].date).toISOString().split('T')[0];
          setCurrentMeterDate(currentMeterDateFormatted);
        }else{
          setCurrentMeterDate("DD/MM/YYYY");
        }

        setLastMeter(res.data.lastMeterResult[0] || {ElectricMeter: '', WaterMeter: ''});
        setLastEletricMeter(res.data.lastMeterResult[0]?res.data.lastMeterResult[0].ElectricMeter:"")
        setLastWaterMeter(res.data.lastMeterResult[0]?res.data.lastMeterResult[0].WaterMeter:"")

        if (res.data.lastMeterResult[0] && res.data.lastMeterResult[0].date) {
          const lastMeterDateFormatted = new Date(res.data.lastMeterResult[0].date).toISOString().split('T')[0];
          setLastMeterDate(lastMeterDateFormatted);
        }
        else{
          setLastMeterDate("DD/MM/YYYY");
        }
      })
      .catch(err => console.error(err));

  }, [selectedOption]);

  const handleSelectBill = (bill) => {
    setSelectedBill(bill);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  }

  const handleSelectBillOption=(Option)=>{
    setBillOption(Option)
    console.log(billOption)
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
    if(selectedBill === 'มิตเตอร์น้ำ ไฟ'){
        switch (e.target.name) {
          case 'currentEletricMeter':
              setEletricMeter(value);
              break;
          case 'currentWaterMeter':
              setWaterMeter(value);
              break;
          default:
              break;
        }
    }
    else{
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
              setRoomPrice(Number(value))
              break;
          default:
              break;
        }
      }
  };

  const handleSave=()=>{
    console.log(new Date())
    console.log(WaterMeter)
    const roomNumber = "Cleaning:" + selectedOption
    const currentMeter ={
      'ElectricMeter': EletricMeter,
      'WaterMeter': WaterMeter,
      'date' : new Date()
    }
    const token = localStorage.getItem('token');
    axios.post('/addMeterAfterClean', {roomNumber,currentMeter}, {
      headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
      },
      withCredentials: true
      })
      .then(res => {
        setEletricMeter('')
        setWaterMeter('')
      })
      .catch(err => console.error(err))


  }

  useEffect(() => {
    if (!selectedOption) return; 

  }, [selectedOption]);

  

  return (
    <div className='meterForm-container'>
      <form onSubmit={handleSubmit}>
      <label>เลือกประเภทบิล:</label>
        <Dropdown id="dropdown" options={["ใบเเจ้งหนี้/ใบเสร็จรับเงิน","ใบแจ้ง/ใบเสร็จคืนค่าประกันห้อง","บิลแรกเข้า","มิตเตอร์หลังทำความสะอาด"]} onSelect={handleSelectBillOption} title={"ประเภทบิล"}/>
        <input type="hidden" name="selectedOption" value={selectedOption}/>
        {billOption&&
          <>
            <label>เลือกห้อง:</label>
            <Dropdown id="dropdown" options={options} onSelect={handleSelect} title={"เลือกห้อง"}/>
            <input type="hidden" name="selectedOption" value={selectedOption}/>
          </>
        }
        
      {selectedOption && (
        <>
         <label>รายการ:</label>
        <Dropdown 
          id="dropdown" 
          options={billListNames} 
          onSelect={handleSelectBill} 
          title={"เลือกรายการ"}
        />
        <input type="hidden" name="selectedOption" value={selectedOption}/>
        </>
      )}
       

        {selectedBill === 'ค่าน้ำ ค่าไฟ' &&(
          <>
            <MeterLastClean roomNumber={"Cleaning:"+selectedOption} setLastMeter={setLastMeter} setLastEletricMeter={setLastEletricMeter} setLastWaterMeter={setLastWaterMeter} setLastMeterDate={setLastMeterDate}/>
            <label>มิตเตอร์น้ำก่อนหน้า:</label>
            <input type='number' name='lastWaterMeter' value={lastWaterMeter} onChange={handleChange} required></input>
            <label>มิตเตอร์ไฟก่อนหน้า:</label>
            <input type='number' name='lastElectricMeter' value={lastElectricMeter} onChange={handleChange} required></input>
            <label>วันที่จดบันทึกก่อนหน้า:</label>
            <input type='date' name='previousDate' value={lastMeterDate} onChange={handleChange} placeholder="dd/mm/yyyy" required></input>

            <label>มิตเตอร์น้ำปัจจุบัน:</label>
            <input type='number' name='currentWaterMeter' value={currentWaterMeter} onChange={handleChange} required></input>
            {selectedOption.includes("C") ? <DigitalMeter roomNumber={"tb_kWh"+selectedOption.replace(/\D/g, '')} setCurrentEletricMeter={setCurrentEletricMeter} setCurrentMeter={setCurrentMeter} selectedBill={selectedBill}/>:""}
            <label>มิตเตอร์ไฟปัจจุบัน:</label>
            <input type='number' name='currentEletricMeter' value={currentEletricMeter} onChange={handleChange} required></input>
            <label>วันที่จดบันทึกปัจจุบัน:</label>
            <input type='date' name='currentDate' value={currentMeterDate} onChange={handleChange} placeholder="dd/mm/yyyy" required></input>
            <button className='GenerateBillBtn' onClick={handlegenerateBill}>ออกบิล</button>

          </>
        )}

        {selectedBill === 'มิตเตอร์น้ำ ไฟ' &&(
          <>
            <label>มิตเตอร์น้ำหลังทำความสะอาด:</label>
            <input type='number' name='currentWaterMeter'value={WaterMeter} onChange={handleChange} required></input>
            {selectedOption.includes("C") ? <DigitalMeter roomNumber={"tb_kWh"+selectedOption.replace(/\D/g, '')} setCurrentEletricMeter={setEletricMeter} selectedBill={selectedBill}/>:""}
            <label>มิตเตอร์ไฟหลังทำความสะอาด:</label>
            <input type='number' name='currentEletricMeter' value={EletricMeter} onChange={handleChange} required></input>

            <button className='GenerateBillBtn' onClick={handleSave}>บันทึก</button>

          </>
        )}

        {selectedBill === 'ค่าเช่าห้อง' &&(
          <>
            <label>ราคาค่าเช่า:</label>
            <input type='number' name='roomPrice' value={roomPrice} onChange={handleChange} required></input>
            <button className='GenerateBillBtn' onClick={handlegenerateBill}>ออกบิล</button>            
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
            <button type="submit" className='submitBtn'>บันทึก</button>
            <button className='GenerateBillBtn' onClick={handlegenerateBill}>ออกบิล</button> 
          </>
          
        )}
    
      
        
      </form>
    </div>
  );
}

export default BillForm;