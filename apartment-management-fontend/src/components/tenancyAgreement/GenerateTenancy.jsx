import React, { useEffect, useState } from 'react';
import GenerateBillStyles from './GenerateTenancyStyle.jsx';




const GenerateTenancy = ({roomInfo, pdfContentRef}) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  var yyyy = today.getFullYear();
  const branch = localStorage.getItem('branch') === "LaithongResort";

  today = dd + '/' + mm + '/' + yyyy;


  return (
    <div style={GenerateBillStyles.billcontainer}>
      <div ref={pdfContentRef}>
        <div style={GenerateBillStyles['billcontainer .logo-container']}>
          <img style={GenerateBillStyles['billcontainer .logo']} className='logo' src={require('../../img/Laithonghouse-logo-RM-BG.png')}  alt="Logo"/>
        </div>

        <h2 style={GenerateBillStyles['billcontainer h2']}>สัญญาจองห้อง /ใบเสร็จมัดจำ</h2>
        <h3 style={GenerateBillStyles['billcontainer h3']}>{branch?"รีสอร์ท บ้านลายทอง":"ลายทองเฮ้าส์"}</h3>
        <p style={GenerateBillStyles['billcontainer p']}>{branch?"888 หมู่ 15 ซอย ราชภัฏ 1 ถนนบ้านสามพร้าว อ.เมือง จ.อุดรธานี 41000":"358 หมู่ 15 ตำบลสามพร้าว อำเภอเมืองอุดรธานี จังหวัดอุดรธานี 41000"} <br/>{branch?"โทร.084-234-2222":"โทร. 0818275520 Email tertarkitty@hotmail.com ID Line tertarkitty"}</p>

        <div style={GenerateBillStyles['roomInfo-container']}> 
          <h3 style={GenerateBillStyles['roomInfo-container .title']}>หมายเลขห้อง:</h3>
          <p style={GenerateBillStyles['roomInfo-container .title']}>{roomInfo? roomInfo.roomNumber:""}</p>
          <h3 style={GenerateBillStyles['roomInfo-container .title']}>วันที่ออกใบจอง:</h3>
          <p style={GenerateBillStyles['roomInfo-container .title']}>{today}</p>
        </div>

        <div style={GenerateBillStyles['rentalName-container']}>
          <h3 style={GenerateBillStyles['rentalName-container .title']}>ชื่อผู้จอง:</h3>
          <p style={GenerateBillStyles['rentalName-container .name']}>{roomInfo? roomInfo.rentalName:""}</p>
        </div>

        <div style={GenerateBillStyles['titleInfo-container']}>
          <h3 style={GenerateBillStyles['titleInfo-container .list']}>รายการ</h3>
          <h3 style={GenerateBillStyles['titleInfo-container .Meter']}>หมายเลขห้อง</h3>
          <h3 style={GenerateBillStyles['titleInfo-container .Meter']}>วันที่ย้ายเข้า</h3>
          <h3 style={GenerateBillStyles['titleInfo-container .Meter']}>จำนวนเงิน</h3>
        </div>

          <div style={GenerateBillStyles['titleInfo-container']}>
            <p style={GenerateBillStyles['titleInfo-container .list']}>1. ค่าจองห้อง</p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}>{roomInfo? roomInfo.roomNumber:""}</p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}>{roomInfo? new Date(roomInfo.startDate).toLocaleDateString('en-GB') :""}</p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}>1000</p>
          </div>
          <div style={GenerateBillStyles['titleInfo-container']}>
            <p style={GenerateBillStyles['titleInfo-container .list2']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
          </div>
          
          <div style={GenerateBillStyles['titleInfo-container']}>
            <p style={GenerateBillStyles['titleInfo-container .list2']}>ผู้จองจะได้รับเงินคืนในวันทำสัญญาเรียบร้อยแล้ว</p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
          </div>

          <div style={GenerateBillStyles['titleInfo-container']}>
            <p style={GenerateBillStyles['titleInfo-container .list2']}>ค่าห้องเช่า {branch?"3800":"3500"} บาทต่อเดือน</p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
          </div>
          <div style={GenerateBillStyles['titleInfo-container']}>
            <p style={GenerateBillStyles['titleInfo-container .list2']}>ค่าประกันห้อง {branch?"7000":"5000"} บาท *ต้องเช่าอย่างน้อย 6 เดือน  </p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
          </div>
          <div style={GenerateBillStyles['titleInfo-container']}>
            <p style={GenerateBillStyles['titleInfo-container .list2']}>{branch?"ค่ากุญแจดอกละ 100 บาท ":"ค่าคีย์การ์ดใบละ 100 บาท "}</p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
          </div>
          <div style={GenerateBillStyles['titleInfo-container']}>
            <p style={GenerateBillStyles['titleInfo-container .list2']}>ค่าน้ำหน่วยละ {branch?"25":"18"} บาท *จ่ายขั้นต่ำ เดือนละ 50 บาท</p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
          </div>
          <div style={GenerateBillStyles['titleInfo-container']}>
            <p style={GenerateBillStyles['titleInfo-container .list2']}>ค่าไฟหน่วยละ 9 บาท</p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
          </div>

        <div style={GenerateBillStyles['titleInfo-container']}>
            <h3 style={GenerateBillStyles['titleInfo-container .total']}>รวมเป็นเงินทั้งสิ้น</h3>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <h3 style={GenerateBillStyles['titleInfo-container .totalAmount']}>1000</h3>
        </div>
      
        <div style={GenerateBillStyles['paymentInfo-container']}>
          <div style={GenerateBillStyles['info-container']}>
            <h3 style={GenerateBillStyles['info-container h3']}>***หมายเหตุ***</h3>
            <h3 style={GenerateBillStyles['info-container h3']}>***ถ้าเลยกำหนดวันย้ายเข้าผู้จองยังไม่มาทำสัญญาจะถูกยึดเงินประกัน***</h3>
            <h3 style={GenerateBillStyles['info-container h3']}>กรุณาโอนเงินเข้า บัญชี {branch?"นายเกรียงศักดิ์ พงศ์ภูมิพิเชฐ":"นางสาวกนกภรณ์ อักษร"}</h3>
            <h3 style={GenerateBillStyles['info-container h3']}>{branch?"932-2-06893-7":"683-2-09743-6"}</h3>
            <h3 style={GenerateBillStyles['info-container h3']}>ธนาคาร {branch?"กสิกรไทย":"กสิกรไทย"}</h3>
            
          </div>
        

          <div style={GenerateBillStyles['QRcode-container']}>
            <img style={GenerateBillStyles['QRcode-container .QRcode']} src={branch?require('../../img/SecondbranchQRCodePayment.jpg'):require('../../img/QRCodePayment.png')}  alt="QRcode"/>
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default GenerateTenancy;