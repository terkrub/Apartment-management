import React, { useEffect, useState } from 'react';
import GenerateBillStyles from './GenerateBillStyle.jsx';




const GenerateBill = ({ billOption ,roomInfo, pdfContentRef, billItems}) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  var yyyy = today.getFullYear();
  const branch = localStorage.getItem('branch') === "LaithongResort";

  today = dd + '/' + mm + '/' + yyyy;

  const [totalAmount, setTotalAmount] = useState(null)

  useEffect(()=>{
    const deductionIndex = billItems.findIndex(item => item.list === 'หัก');

    const totalBeforeDeduction = billItems.slice(0, deductionIndex)
      .reduce((total, item) => total + (item.amount || 0), 0);
  
    const totalAfterDeduction = billItems.slice(deductionIndex + 1)
      .reduce((total, item) => total + (item.amount || 0), 0);
    
    setTotalAmount(totalBeforeDeduction - totalAfterDeduction)
  },[billItems])

  return (
    <div style={GenerateBillStyles.billcontainer}>
      <div ref={pdfContentRef}>
        <div style={GenerateBillStyles['billcontainer .logo-container']}>
          <img style={GenerateBillStyles['billcontainer .logo']} className='logo' src={require('../../img/Laithonghouse-logo-RM-BG.png')}  alt="Logo"/>
        </div>

        <h2 style={GenerateBillStyles['billcontainer h2']}>{billOption}</h2>
        <h3 style={GenerateBillStyles['billcontainer h3']}>{branch?"บ้านลายทองรีสอร์ท":"ลายทองเฮ้าส์"}</h3>
        <p style={GenerateBillStyles['billcontainer p']}>{branch?"888 ถนนบ้านสามพร้าว อ.เมือง จ.อุดรธานี 41000":"358 หมู่ 15 ตำบลสามพร้าว อำเภอเมืองอุดรธานี จังหวัดอุดรธานี 41000"} <br/>{branch?"โทร.084-234-2222":"โทร. 0818275520 Email tertarkitty@hotmail.com ID Line tertarkitty"}</p>

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
            {item.list==="หัก"? <h4 style={GenerateBillStyles['titleInfo-container .deduct']}>{item.list}</h4>:<p style={GenerateBillStyles['titleInfo-container .list']}>{item.list}</p>}
            <p style={GenerateBillStyles['titleInfo-container .Meter']}>{item.meterPrevious}</p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}>{item.meterCurrent}</p>
            <p style={GenerateBillStyles['titleInfo-container .unit']}>{item.unit}</p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}>{item.pricePerUnit}</p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}>{item.amount}</p>
          </div>
        ))}

        <div style={GenerateBillStyles['titleInfo-container']}>
            <h3 style={GenerateBillStyles['titleInfo-container .total']}>{billOption==="ใบแจ้ง/ใบเสร็จคืนค่าประกันห้อง"?"คงเหลือ":"ยอดรวม"}</h3>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <p style={GenerateBillStyles['titleInfo-container .unit']}></p>
            <p style={GenerateBillStyles['titleInfo-container .Meter']}></p>
            <h3 style={GenerateBillStyles['titleInfo-container .totalAmount']}>
            {(billOption==="ใบแจ้ง/ใบเสร็จคืนค่าประกันห้อง"|| billOption === "บิลแรกเข้า")? totalAmount:billItems.reduce((total, item) => total + (item.amount || 0), 0)}
            </h3>
        </div>
        
        {billOption!=="ใบแจ้ง/ใบเสร็จคืนค่าประกันห้อง"&&
          
        <div style={GenerateBillStyles['paymentInfo-container']}>
          <div style={GenerateBillStyles['info-container']}>
            <h3 style={GenerateBillStyles['info-container h3']}>***หมายเหตุ***</h3>
            <h3 style={GenerateBillStyles['info-container h3']}>กรุณาโอนเงินเข้า บัญชี นางสาวกนกภรณ์ อักษร</h3>
            <h3 style={GenerateBillStyles['info-container h3']}>{branch?"066-2-25385-5":"683-2-09743-6"}</h3>
            <h3 style={GenerateBillStyles['info-container h3']}>ธนาคาร {branch?"ttb":"กสิกรไทย"}</h3>
            {billOption !="บิลแรกเข้า"?<h3 style={GenerateBillStyles['info-container h3']}>ชำระไม่เกินวันที่ 5 ของเดือนเกินกำหนดปรับวันละ 100 บาท</h3>:""}
          </div>
        

          <div style={GenerateBillStyles['QRcode-container']}>
            <img style={GenerateBillStyles['QRcode-container .QRcode']} src={branch?require('../../img/SecondbranchQRCodePayment.jpg'):require('../../img/QRCodePayment.png')}  alt="QRcode"/>
          </div>
        </div>
        }
        
      </div>
      
    </div>
  );
};

export default GenerateBill;