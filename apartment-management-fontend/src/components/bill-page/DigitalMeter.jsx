import { useEffect, useState } from "react";
import axios from "../../api/axios";

const DigitalMeter=({roomNumber, setCurrentEletricMeter, setCurrentMeter})=>{
    const [digitalMeter,setDigitalMeter] = useState()

    const getDigitalMeter=()=>{
        axios.post('/digitalMeter', { 
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
            })
            .then(res => {
                setDigitalMeter(res.data.data[0])
            })
            .catch(err => console.error(err));
    }
    useEffect(()=>{
        getDigitalMeter()
        
    },[])
    if (!digitalMeter) {
        return <div>Loading...</div>; // or any other loading/error state
    }
    
    const kWhValue = digitalMeter[roomNumber] ? digitalMeter[roomNumber] : "Data not available";
    const date = digitalMeter.tb_date || "Date not available";
    const time = digitalMeter.tb_time || "Time not available";
    const handleClick =()=>{
        setCurrentEletricMeter(kWhValue);
        setCurrentMeter(prev => ({...prev, ElectricMeter: kWhValue}));
    }
    

    return(
    <div className="DigitalMeterContainer">
        <h4>ค่าจากมิตเตอร์: <a onClick={()=>{handleClick()}} style={{ backgroundColor: '#f0f0f0', cursor: 'pointer'}}>{kWhValue+" ("+date+" "+time+")"}</a></h4>
    </div>)
}

export default DigitalMeter