import React, { useState, useEffect, useRef } from 'react';
import Sidebar from "./components/Sidebar"
import GenerateBill from "./components/bill-page/GenerateBill"
import './BillPageStyles.css'
import BillForm from './components/bill-page/BillForm';

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

    return(
        <div className="App">
            <aside>
                <Sidebar active={'bill'}/>
            </aside>
            <section>
              <div className='billContainer'>
                <div className="BillPreview">
                    <GenerateBill billItems={finalBill}/>
                </div>
                <div className='formContainer'>
                  <BillForm  setOtherBill={setOtherBill} otherBill={otherBill}/>             
                </div>
              </div>
            </section>
        </div>
    )
}

export default BillPage