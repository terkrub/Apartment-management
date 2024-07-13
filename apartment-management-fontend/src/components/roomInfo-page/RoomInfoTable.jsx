import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import './RoomInfoTableStyles.css'
import RoomInfoPopup from './RoomInfoPopup';
import GenerateTenancy from '../tenancyAgreement/GenerateTenancy';
import axios from '../../api/axios';

const sampleData = new Array(30).fill(null).map((_, index) => ({
  id: "A01",
  name: `ชนิดานุช ${index + 1}`,
  phoneNumber: '0952204' + (450 + index).toString().padStart(3, '0'),
  entryDate: `07/12/2022`,
  exitDate: `07/12/2023`,
  keycard: 2 + (index % 3),
  keycardExpire: `07/12/2023`,
  deposit: 4200 + (index * 100),
  roomPrice: 3500
}));

const ITEMS_PER_PAGE = 10;

const RoomInfoTable = ({data, onDataChange}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataToShow, setDataToShow] = useState([]);
  const [editItem, setEditItem] = useState(null)
  const [generateItem, setGenerateItem] = useState(null)
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const pdfContentRef = useRef(null);
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const startIndex = (newPage - 1) * ITEMS_PER_PAGE;
    setDataToShow(data.slice(startIndex, startIndex + ITEMS_PER_PAGE));
  };

  const handleEdit = (item) => {
    setEditItem(item);
  }

  const handleGenerate = (item) => {
    const token = localStorage.getItem('token');
    setGenerateItem(item);
    const listName = `ค่าจองห้อง: ${item.roomNumber}`
    axios.post('/addIncome', {title: "roomIncome",listName: listName,finalBill: null ,totalIncome: 1000}, {
      headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
      },
      withCredentials: true
      })
      .then(res => {
      })
      .catch(err => console.error(err))
    generatePdf(item.roomNumber)
  }

  const handleCancel = () => {
    setEditItem(null)
  }

  const alphanumericSort = (a, b) => {
    const regex = /(\D+)(\d+)/;
    const matchA = a.roomNumber.match(regex);
    const matchB = b.roomNumber.match(regex);

    if (matchA && matchB) {
      const [_, lettersA, numberA] = matchA;
      const [__, lettersB, numberB] = matchB;

      if (lettersA === lettersB) {
        return parseInt(numberA) - parseInt(numberB);
      }

      return lettersA.localeCompare(lettersB);
    }

    return a.roomNumber.localeCompare(b.roomNumber);
  };

  useEffect(() => {
    const sorted = [...data].sort(alphanumericSort);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    setDataToShow(sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE));
  }, [data, currentPage]);

  const generatePdf = (roomNumber) => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const options = {
          margin: [10, 5, 10, 5],
          filename: `${roomNumber}-${formattedDate}.pdf`,
          image: { type: 'jpeg', quality: 1 },
          html2canvas: { dpi: 192, scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
    
        return html2pdf().from(pdfContentRef.current).set(options).save();
  };



  return (
    <div className='tableContainer'>
        <table>
            <thead>
                <tr>
                <th>หมายเลขห้อง</th>
                <th>ชื่อผู้เช่า</th>
                <th>เบอร์ติดต่อ</th>
                <th>วันที่เข้าพัก</th>
                <th>วันที่ย้ายออก</th>
                <th>จำนวนคีย์การ์ด</th>
                <th>คีย์การ์ดหมดอายุ</th>
                <th>เงินมัดจำ</th>
                <th>รหัสสํารอง</th>
                <th>ตัวเลือก</th>
                </tr>
            </thead>
            <tbody>
                {dataToShow.map((item) => (
                <tr key={item.roomNumber}>
                    <td>{item.roomNumber}</td>
                    <td>{item.rentalName}</td>
                    <td>{item.rentalPhone}</td>
                    <td>{item.startDate ? new Date(item.startDate).toLocaleDateString('en-GB') :""}</td>
                    <td>{item.exitDate ? new Date(item.exitDate).toLocaleDateString('en-GB') :""}</td>
                    <td>{item.totalKey}</td>
                    <td>{item.keyExpireDate ? new Date(item.keyExpireDate).toLocaleDateString('en-GB') :""}</td>
                    <td>{item.totalDeposit}</td>
                    <td>{item.passCode}</td>
                    <td>
                    <button className='editBtn' onClick={() => handleEdit(item)}>แก้ไข</button>
                    <button className='genrateBtn' onClick={() => handleGenerate(item)}>ออกใบจองห้อง</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
        </div>
        {editItem && (<RoomInfoPopup roomData={editItem} handleCancel={handleCancel}/>)}
        <div style={{ display: 'none' }}>
                <GenerateTenancy pdfContentRef={pdfContentRef} roomInfo={generateItem}/>
        </div>
    </div>
  );
};

export default RoomInfoTable;
