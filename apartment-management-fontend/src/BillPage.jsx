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
    const pdfContentRef = useRef(null);

    useEffect(()=>{
      setMeterItem([
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
          ])
    }, [roomPrice, currentMeter, lastMeter])

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
        await generatePdf()
        window.location.reload();

    }

    return(
        <div className="App">
            <aside>
                <Sidebar active={'bill'}/>
            </aside>
            <section>
              <div className='billContainer'>
                <div className="BillPreview">
                    <GenerateBill billItems={finalBill} roomInfo={roomInfo} pdfContentRef={pdfContentRef}/>
                </div>
                <div className='formContainer'>
                  <BillForm generatePdf={generatePdf} handlegenerateBill={handlegenerateBill} setRoomInfo={setRoomInfo} setOtherBill={setOtherBill} otherBill={otherBill} setCurrentMeter={setCurrentMeter} setLastMeter={setLastMeter} setRoomPrice={setRoomPrice} roomPrice={roomPrice}/>             
                </div>
              </div>
            </section>
        </div>
    )
}

export default BillPage