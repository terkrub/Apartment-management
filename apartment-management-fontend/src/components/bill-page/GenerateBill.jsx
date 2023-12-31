import React from 'react';
import GenerateBillStyles from './GenerateBillStyle.jsx';




const GenerateBill = ({ currentMeter, lastMeter , roomInfo, pdfContentRef, billItems}) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  var yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;

  return (
    <div style={GenerateBillStyles.billcontainer}>
      <div ref={pdfContentRef}>
        <div style={GenerateBillStyles['billcontainer .logo-container']}>
          <img style={GenerateBillStyles['billcontainer .logo']} className='logo' src={require('../../img/Laithonghouse-logo-RM-BG.png')}  alt="Logo"/>
        </div>

        <h2 style={GenerateBillStyles['billcontainer h2']}>ใบเเจ้งหนี้/ใบเสร็จรับเงิน</h2>
        <h3 style={GenerateBillStyles['billcontainer h3']}>ลายทองเฮ้าส์</h3>
        <p style={GenerateBillStyles['billcontainer p']}>358 หมู่ 15 ตำบลสามพร้าว อำเภอเมืองอุดรธานี จังหวัดอุดรธานี 41000 <br/>โทร. 0818275520 Email tertarkitty@hotmail.com ID Line tertarkitty</p>

        <div style={GenerateBillStyles['roomInfo-container']}> 
          <h3 style={GenerateBillStyles['roomInfo-container .title']}>หมายเลขห้อง:</h3>
          <p style={GenerateBillStyles['roomInfo-container .title']}>{roomInfo? roomInfo.roomNumber:""}</p>
          <h3 style={GenerateBillStyles['roomInfo-container .title']}>วันที่ออกใบเเจ้งหนี้:</h3>
          <p style={GenerateBillStyles['roomInfo-container .title']}>{today}</p>
        </div>

        <div style={GenerateBillStyles['rentalName-container']}>
          <h3 style={GenerateBillStyles['rentalName-container .title']}>ชื่อผู้เช่า:</h3>
          <p style={GenerateBillStyles['rentalName-container .name']}>{roomInfo? roomInfo.rentalName:""}</p>
        </div>

        <div style={GenerateBillStyles['titleInfo-container']}>
          <h3 style={GenerateBillStyles['titleInfo-container .list']}>รายการ</h3>
          <h3 style={GenerateBillStyles['titleInfo-container .Meter']}>มิเตอร์ก่อนหน้า</h3>
          <h3 style={GenerateBillStyles['titleInfo-container .Meter']}>มิเตอร์ปัจจุบัน</h3>
          <h3 style={GenerateBillStyles['titleInfo-container .unit']}>จำนวน</h3>
          <h3 style={GenerateBillStyles['titleInfo-container .Meter']}>ราคาต่อหน่วย</h3>
          <h3 style={GenerateBillStyles['titleInfo-container .Meter']}>จำนวนเงิน</h3>
        </div>

        {billItems.map((item,index) => (
          <div  key={index} style={GenerateBillStyles['titleInfo-container']}>
            <p style={GenerateBillStyles['titleInfo-container .list']}>{item.list}</p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}>{item.meterPrevious}</p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}>{item.meterCurrent}</p>
            <p style={GenerateBillStyles['titleInfo-container .unit']}>{item.unit}</p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}>{item.pricePerUnit}</p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}>{item.amount}</p>
          </div>
        ))}

        <div style={GenerateBillStyles['titleInfo-container']}>
            <h3 style={GenerateBillStyles['titleInfo-container .total']}>ยอดรวม</h3>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .unit']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <h3 style={GenerateBillStyles['titleInfo-container .totalAmount']}>
              {billItems.reduce((total, item) => total + (item.amount || 0), 0)}
            </h3>
        </div>
        

        <div style={GenerateBillStyles['paymentInfo-container']}>
          <div style={GenerateBillStyles['info-container']}>
            <h3 style={GenerateBillStyles['info-container h3']}>***หมายเหตุ***</h3>
            <h3 style={GenerateBillStyles['info-container h3']}>กรุณาโอนเงินเข้า บัญชี นางสาวกนกภรณ์ อักษร</h3>
            <h3 style={GenerateBillStyles['info-container h3']}>683-2-09743-6</h3>
            <h3 style={GenerateBillStyles['info-container h3']}>ธนาคาร กสิกรไทย</h3>
            <h3 style={GenerateBillStyles['info-container h3']}>ชำระไม่เกินวันที่ 5 ของเดือนเกินกำหนดปรับวันละ 100 บาท</h3>
          </div>

          <div style={GenerateBillStyles['QRcode-container']}>
            <img style={GenerateBillStyles['QRcode-container .QRcode']} src={require('../../img/QRCodePayment.png')}  alt="QRcode"/>
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default GenerateBill;