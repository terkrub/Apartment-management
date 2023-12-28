import React, { useState } from 'react';
import MaintainPopup from './MaintainPopup';

const sampleData = new Array(3).fill(null).map((_, index) => ({
  id: 101 + index,
  title: `test`,
  notiDate: `07/12/2022`,
  status: 'รอดำเนินการ',
}));

const ITEMS_PER_PAGE = 10;

const MaintainanceTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataToShow, setDataToShow] = useState(sampleData.slice(0, ITEMS_PER_PAGE));
  const [editItem, setEditItem] = useState(null)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const startIndex = (newPage - 1) * ITEMS_PER_PAGE;
    setDataToShow(sampleData.slice(startIndex, startIndex + ITEMS_PER_PAGE));
  };

  const handleEdit = (item) => {
    setEditItem(item);
  }

  const handleCancel = () => {
    setEditItem(null)
  }

  const handleAdd= (item) =>{
    setEditItem(item)
  }

  return (
    <div className='tableContainer'>
        <table>
            <thead>
                <tr>
                <th>หมายเลขห้อง</th>
                <th>เรืองที่ซ่อม</th>
                <th>วันที่เเจ้ง</th>
                <th>สถานะ</th>
                <th>ตัวเลือก</th>
                </tr>
            </thead>
            <tbody>
                {dataToShow.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.notiDate}</td>
                    <td>{item.status}</td>
                    <td>
                    <button className='successBtn' onClick={() => handleEdit(item)}>ซ่อมเเล้ว</button>
                    <button className='progressBtn' onClick={() => handleEdit(item)}>กำลังดำเนินการ</button>
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
        <button className='addMaintainRoom'>เพิ่มห้องที่ต้องการซ่อม</button>
        {editItem && (<MaintainPopup maintainData={editItem} handleCancel={handleCancel}/>)}
    </div>
  );
};

export default MaintainanceTable;
