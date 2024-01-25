import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './FinancialGraphStyles.css';
import FinanceInfoPopup from '../Finance/FinancePopup';

// Register the necessary Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const FinancialGraph = ({ data, fetchFinanceData }) => {
    const [monthSelected,setMonthSelected] = useState(null)
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'category',
                labels: data.map(d => d.month),
                barPercentage: 0.5,
                ticks: {
                    display: false // Hides the x-axis labels
                }
            },
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'ภาพรวมการเงิน ปี2024',
                font: {
                    size: 24
                }
            },
        },
    };

    const chartData = {
        labels: data.map(d => d.month),
        datasets: [
            {
                label: 'รายรับ',
                data: data.map(d => d.income),
                backgroundColor: '#2AEA82',
                borderColor: '#2AEA82',
                borderWidth: 1,
            },
            {
                label: 'รายจ่าย',
                data: data.map(d => d.expense),
                backgroundColor: '#FF5252',
                borderColor: '#FF5252',
                borderWidth: 1
            },
            {
                label: 'กำไร',
                data: data.map(d => d.profit),
                backgroundColor: '#01BFFB',
                borderColor: '#01BFFB',
                borderWidth: 1
            }
        ]
    };

    const months_th_mini = [ "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค." ];

    return (
        <div>
            <div className='chartContainer'>
                <Bar data={chartData} options={options} />
                <div className="buttonContainer">
                    {data.map((d, index) => (
                        <button key={d.month} className="monthButton" onClick={()=>{setMonthSelected(d.month)}}>{months_th_mini[d.month-1]}</button>
                    ))}
                </div>
            </div>
            {monthSelected&&<FinanceInfoPopup month={monthSelected} setMonthSelected={setMonthSelected} fetchFinanceData={fetchFinanceData}/>}
        </div>
    );
};

export default FinancialGraph;
