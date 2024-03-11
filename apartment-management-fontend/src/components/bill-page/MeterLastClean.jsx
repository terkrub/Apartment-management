import { useEffect, useState } from "react";
import axios from "../../api/axios";

const MeterLastClean=({roomNumber, setLastEletricMeter, setLastMeter, setLastWaterMeter,setLastMeterDate})=>{
    const [meter,setMeter] = useState()

    const getMeter=()=>{
        axios.post('/getMeterAfterClean', {roomNumber},{ 
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
            })
            .then(res => {
                setMeter(res.data.data)
            })
            .catch(err => console.error(err));
    }
    useEffect(()=>{
        setMeter()
        getMeter()
        
    },[roomNumber])

    const handleClick =()=>{
        setLastWaterMeter(meter.WaterMeter)
        setLastEletricMeter(meter.ElectricMeter);
        setLastMeterDate(new Date(meter.date).toISOString().split('T')[0])
        setLastMeter(meter)
    }
    

    return(
    <div className="DigitalMeterContainer">
        
        {meter&& 
        <div onClick={()=>{handleClick()}} style={{ backgroundColor: '#f0f0f0', cursor: 'pointer'}}>
            <h4>มิตเตอร์วันย้ายเข้า:</h4>
            <p>มิตเตอร์ไฟ: {meter.ElectricMeter}</p>
            <p>มิตเตอร์น้ำ: {meter.WaterMeter}</p>
            <p>วันที่ทำความสะอาด: {meter.date.split("T")[0]}</p>
        </div>
        }
        
    </div>)
}

export default MeterLastClean