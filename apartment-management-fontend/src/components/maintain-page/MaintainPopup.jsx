import React, { useState } from 'react';

const MaintainPopup = ({maintainData, handleSave, handleCancel }) => {
  const [formData, setFormData] = useState(maintainData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    handleSave(formData);
  }
  const convertDateToISO = (date) => {
    return date ? new Date(date).toISOString().substr(0, 10) : '';
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>เพิ่มห้องที่ต้องการซ่อม</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <label>หมายเลขห้อง:</label>
          <input type="number" id="capacity" name="rentalPhone" value={formData.id} onChange={handleChange} />

          <label>วันที่เเจ้ง:</label>
          <input type="date" id="moveIn" name="startDate" value={convertDateToISO(formData.notiDate)} onChange={handleChange} />

          <label>เรื่องที่ซ่อม:</label>
          <input  value={formData.title} onChange={handleChange} />

          <label>สถานะ:</label>
          <input value={formData.status} onChange={handleChange} />

          <button type="submit" className='submitBtn'>บันทึก</button>
          <button type="button" className='cancelBtn' onClick={handleCancel}>ยกเลิก</button>
        </form>
      </div>
    </div>
  );
};

export default MaintainPopup;