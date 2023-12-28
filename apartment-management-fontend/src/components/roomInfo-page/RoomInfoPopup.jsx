import React, { useState } from 'react';
import './RoomInfoPopupStyles.css'

const RoomInfoPopup = ({roomData, handleSave, handleCancel }) => {
  const [formData, setFormData] = useState(roomData);

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
        <h2> ห้อง {formData.id}</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <label>ชื่อผู้เช่า:</label>
          <input type="text" id="roomType" name="rentalName" value={formData.name} onChange={handleChange} />

          <label>เบอร์โทร:</label>
          <input type="number" id="capacity" name="rentalPhone" value={formData.phoneNumber} onChange={handleChange} />

          <label>วันที่เข้าพัก:</label>
          <input type="date" id="moveIn" name="startDate" value={convertDateToISO(formData.entryDate)} onChange={handleChange} />

          <label>วันที่ย้ายออก:</label>
          <input type="date" id="moveOut" name="exitDate" value={convertDateToISO(formData.exitDate)} onChange={handleChange} />

          <label>จำนวนคีย์การ์ด:</label>
          <input type="number" id="capacity" name="totalKey" value={formData.keycard} onChange={handleChange} />

          <label>เงินมัดจำ:</label>
          <input type="number" id="pricePerNight" name="totalDeposit" value={formData.deposit} onChange={handleChange} />

          <label>คีย์การ์ดหมดอายุ:</label>
          <input type="date" id="moveOut" name="keyExpireDate" value={convertDateToISO(formData.keycardExpire)} onChange={handleChange} />

          <button type="submit" className='submitBtn'>บันทึก</button>
          <button type="button" className='cancelBtn' onClick={handleCancel}>ยกเลิก</button>
        </form>
      </div>
    </div>
  );
};

export default RoomInfoPopup;