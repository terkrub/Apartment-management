import React, { useEffect, useState } from 'react';
import './RoomInfoTableStyles.css'
import RoomInfoPopup from './RoomInfoPopup';

const sampleData = new Array(30).fill(null).map((_, index) => ({
  id: 101 + index,
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
  const [dataToShow, setDataToShow] = useState(data.slice(0, ITEMS_PER_PAGE));
  const [editItem, setEditItem] = useState(null)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const startIndex = (newPage - 1) * ITEMS_PER_PAGE;
    setDataToShow(data.slice(startIndex, startIndex + ITEMS_PER_PAGE));
  };

  const handleEdit = (item) => {
    setEditItem(item);
  }

  const handleCancel = () => {
    setEditItem(null)
  }

  useEffect(()=>{
    setDataToShow(data.slice(0, ITEMS_PER_PAGE));
    setCurrentPage(1);
  },[data])

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
                    <td>
                    <button className='editBtn' onClick={() => handleEdit(item)}>แก้ไข</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        <div className="pagination">
            {Array.from({ length: Math.ceil(sampleData.length / ITEMS_PER_PAGE) }, (_, index) => (
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
    </div>
  );
};

export default RoomInfoTable;
