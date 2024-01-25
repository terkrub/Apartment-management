import React, { useState, useEffect } from 'react';
import Sidebar from "./components/Sidebar"
import FinancialGraph from "./components/home-page/FinancialGraph";
import OverallStatus from "./components/home-page/OverallStatus"
import axios from "./api/axios.jsx"

const Homepage=()=>{
    const [financialData, setFinancialData] = useState([]);

    const fetchFinanceData=()=>{
        const token = localStorage.getItem('token')
        axios.post('/monthly-finance',{ roomNumber: null },{
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
          .then(res => {
            setFinancialData(res.data)
          })
          .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchFinanceData()
      }, []);

    return(
        <div className="App">
            <aside>
                <Sidebar active={"home"}/>
            </aside>
            <section>
                <OverallStatus/>
                <FinancialGraph data={financialData} fetchFinanceData={fetchFinanceData}/>
            </section>
        </div>
    )
}

export default Homepage