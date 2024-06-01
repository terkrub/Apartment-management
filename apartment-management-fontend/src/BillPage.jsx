import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import Sidebar from "./components/Sidebar"
import GenerateBill from "./components/bill-page/GenerateBill"
import './BillPageStyles.css'
import BillForm from './components/bill-page/BillForm';
import axios from '../src/api/axios';

const BillPage=()=>{
    const [currentMeter, setCurrentMeter] = useState(null);
    const [lastMeter, setLastMeter] = useState(null);
    const [roomInfo, setRoomInfo] = useState(null);
    const [roomPrice, setRoomPrice] = useState(3200)
    const [meterItem, setMeterItem] = useState([])
    const [otherBill,setOtherBill]= useState([])
    const [finalBill,setFinalBill]= useState([])
    const [billOption, setBillOption] = useState(null)
    const pdfContentRef = useRef(null);
    const branch = localStorage.getItem('branch') === "LaithongResort";

    useEffect(() => {
      const calculateWaterCharge = () => {
        const waterUsage = currentMeter && lastMeter ? currentMeter.WaterMeter - lastMeter.WaterMeter : 0;
        return Math.max(50, waterUsage * (branch?25:18));
      };
    
      const calculateElectricCharge = () => {
        const electricUsage = currentMeter && lastMeter ? currentMeter.ElectricMeter - lastMeter.ElectricMeter : 0;
        return Math.max(0, electricUsage * 9);
      };
    
      const waterItem = {
        list: 'ค่าน้ำ (ขั้นต่ำ 50 บาท)',
        meterPrevious: lastMeter ? lastMeter.WaterMeter : '',
        meterCurrent: currentMeter ? currentMeter.WaterMeter : '',
        unit: currentMeter && lastMeter ? currentMeter.WaterMeter - lastMeter.WaterMeter : '',
        pricePerUnit: branch?25:18,
        amount: calculateWaterCharge(),
      };
    
      const electricItem = {
        list: 'ค่าไฟ',
        meterPrevious: lastMeter ? lastMeter.ElectricMeter : '',
        meterCurrent: currentMeter ? currentMeter.ElectricMeter : '',
        unit: currentMeter && lastMeter ? currentMeter.ElectricMeter - lastMeter.ElectricMeter : '',
        pricePerUnit: 9,
        amount: calculateElectricCharge(),
      };
    
      const rentalItem = {
        list: 'ค่าเช่าห้อง',
        meterPrevious: '',
        meterCurrent: '',
        unit: 1,
        pricePerUnit: roomPrice,
        amount: roomPrice,
      };

      const rentalKey = {
        list: branch?'กุญแจ':'ค่าคีย์การ์ด',
        meterPrevious: '',
        meterCurrent: '',
        unit: roomInfo ? roomInfo.totalKey:0,
        pricePerUnit: 100,
        amount: roomInfo ? roomInfo.totalKey*100:0,
      }

      const rentalDeposit = {
        list: 'เงินประกัน',
        meterPrevious: '',
        meterCurrent: '',
        unit: 1,
        pricePerUnit: roomInfo ? roomInfo.totalDeposit:'',
        amount: roomInfo ? roomInfo.totalDeposit:'',
      }

      const title = {
        list: 'หัก',
        meterPrevious: '',
        meterCurrent: '',
        unit: '',
        pricePerUnit: '',
        amount: '',
      }

      const bookingFees = {
        list: 'ค่าจองห้อง',
        meterPrevious: '',
        meterCurrent: '',
        unit: '',
        pricePerUnit: '',
        amount: 1000,
      }
    
      

      if (billOption === "ใบแจ้ง/ใบเสร็จคืนค่าประกันห้อง") {
        const meterItems = [rentalDeposit, rentalKey,title,waterItem, electricItem];
        setMeterItem(meterItems);
      }
      else if(billOption === "บิลแรกเข้า"){
        const meterItems = [rentalItem,rentalDeposit, rentalKey,title,bookingFees];
        setMeterItem(meterItems);
      }
      else{
        const meterItems = [waterItem, electricItem,rentalItem];
        setMeterItem(meterItems);
      }
      
    }, [roomPrice, currentMeter, lastMeter, billOption]);
    

    useEffect(() => {
      setFinalBill([...meterItem, ...otherBill]);
    }, [otherBill, meterItem]);

    const generatePdf = () => {
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          const options = {
            margin: [10, 5, 10, 5],
            filename: `${roomInfo.roomNumber}-${formattedDate}.pdf`,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { dpi: 192, scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          };
      
          return html2pdf().from(pdfContentRef.current).set(options).save();
    };

    const handlegenerateBill= async ()=>{
        const token = localStorage.getItem('token');
        if(billOption==="บิลแรกเข้า"){
          const deductionIndex = finalBill.findIndex(item => item.list === 'หัก');

          const totalBeforeDeduction = finalBill.slice(0, deductionIndex)
            .reduce((total, item) => total + (item.amount || 0), 0);

          const totalAfterDeduction = finalBill.slice(deductionIndex + 1)
            .reduce((total, item) => total + (item.amount || 0), 0);
          
          const totalIncome = totalBeforeDeduction - totalAfterDeduction;

          const listName = `เงินเเรกเข้าห้อง: ${roomInfo.roomNumber}`

          axios.post('/addIncome', {title: "roomIncome",listName, finalBill, totalIncome}, {
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
            })
            .then(res => {
            })
            .catch(err => console.error(err))
        }
        else{
        axios.post('/AddMeter', {roomInfo,currentMeter,lastMeter}, {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
        })
        .then(res => {
            setCurrentMeter(null)
            setLastMeter(null)
            setRoomInfo(null)
        })
        .catch(err => console.error(err))
      }
        
        if(billOption==="ใบเเจ้งหนี้/ใบเสร็จรับเงิน"){
          const totalIncome = finalBill.reduce((total, item) => total + (item.amount || 0), 0)
          const listName = `ค่าห้อง: ${roomInfo.roomNumber}`
          axios.post('/addIncome', {title: "roomIncome",listName, finalBill, totalIncome}, {
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
            })
            .then(res => {
            })
            .catch(err => console.error(err))


            if(Number(roomPrice) !== roomInfo.roomPrice){
              const room = roomInfo.roomNumber
              axios.post('/updatePrice', {room, roomPrice}, {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
                })
                .then(res => {
                })
                .catch(err => console.error(err))
            }
        }
        else if(billOption==="ใบแจ้ง/ใบเสร็จคืนค่าประกันห้อง"){
          const deductionIndex = finalBill.findIndex(item => item.list === 'หัก');

          const totalBeforeDeduction = finalBill.slice(0, deductionIndex)
            .reduce((total, item) => total + (item.amount || 0), 0);

          const totalAfterDeduction = finalBill.slice(deductionIndex + 1)
            .reduce((total, item) => total + (item.amount || 0), 0);
          
          const totalReturn = totalBeforeDeduction - totalAfterDeduction;

          const listName = `คืนเงินประกันห้อง: ${roomInfo.roomNumber}`
          axios.post('/addExpense', {title: "roomReturn",listName, expenseInfo: finalBill, totalReturn}, {
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
            })
            .then(res => {
            })
            .catch(err => console.error(err))
        }
        await generatePdf()

    }

    return(
        <div className="App">
            <aside>
                <Sidebar active={'bill'}/>
            </aside>
            <section>
              <div className='billContainer'>
                <div className="BillPreview">
                    <GenerateBill billOption={billOption} billItems={finalBill} roomInfo={roomInfo} pdfContentRef={pdfContentRef}/>
                </div>
                <div className='formContainer'>
                  <BillForm billOption={billOption} setBillOption={setBillOption} generatePdf={generatePdf} handlegenerateBill={handlegenerateBill} setRoomInfo={setRoomInfo} setOtherBill={setOtherBill} otherBill={otherBill} setCurrentMeter={setCurrentMeter} setLastMeter={setLastMeter} setRoomPrice={setRoomPrice} roomPrice={roomPrice}/>             
                </div>
              </div>
            </section>
        </div>
    )
}

export default BillPage