import React, { useState, useEffect } from 'react';
import Sidebar from "./components/Sidebar"
import RoomInfoTable from "./components/roomInfo-page/RoomInfoTable.jsx"
import RoomStatus from "./components/roomInfo-page/RoomStatus.jsx"
import axios from "./api/axios.jsx"

const RoomInfopage=()=>{
    const [data, setData] = useState({total:0, available: 0, results:[]})

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.post('/RoomInfo',{ roomNumber: null },{
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
          .then(res => {
            setData(res.data)
          })
          .catch(err => console.error(err))
      }, []);

    const handleDataChange = (newData) => {
      setData(newData);
    }
    return(
        <div className="App">
            <aside>
                <Sidebar active={'roomInfo'}/>
            </aside>
            <section>
                <RoomStatus total={data.total} available={data.available}/>
                <RoomInfoTable data={data.results} onDataChange={handleDataChange}/>
            </section>
        </div>
    )
}

export default RoomInfopage