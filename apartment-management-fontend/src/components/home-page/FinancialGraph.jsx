import React from 'react';
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

// Register the necessary Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const FinancialGraph = ({ data }) => {
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

    return (
        <div>
            <div className='chartContainer'>
                <Bar data={chartData} options={options} />
                <div className="buttonContainer">
                    {data.map((d, index) => (
                        <button key={index} className="monthButton">{d.month}</button>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default FinancialGraph;
