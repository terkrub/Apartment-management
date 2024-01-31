import Styling from 'react-styling';

const GenerateBillStyles = Styling(`
  .billcontainer .logo-container {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height:180px;
  }
  .billcontainer .logo{
    width: 260px;
  }

  .billcontainer h2 {
    background-color: #fff;
    text-align: center;
    margin: 0;
    padding: 0; 
  }

  .billcontainer h3 {
    background-color: #fff;
    margin: 0;
    padding: 0; 
  }

  .billcontainer p {
    background-color: #fff;
    margin: 0;
    padding: 0; 
  }

  .roomInfo-container{
    background-color: #fff;
    display:flex;
    align-items: center;

  }

  .roomInfo-container .title{
    background-color: #fff;
    border: 1px solid;
    width:25%;
    height: 22px;
    font-size: 18px;
    margin: 0;
    padding: 0; 
  }

  .rentalName-container{
    background-color: #fff;
    display:flex;
    align-items: center;
  }

  .rentalName-container .title{
    background-color: #fff;
    border: 1px solid;
    width:25%;
    height: 22px;
    font-size: 18px;
    margin: 0;
    padding: 0; 
  }

  .rentalName-container .name{
    background-color: #fff;
    border: 1px solid;
    width:76%;
    height: 22px;
    font-size: 18px;
    margin: 0;
    padding: 0; 
  }

  .titleInfo-container{
    background-color: #fff;
    display:flex;
    align-items: center;

  }

  .titleInfo-container .list{
    background-color: #fff;
    border: 1px solid;
    width:400px;
    height: 20px;
    font-size: 15px;
    margin: 0;
    padding: 0; 
  }

  .titleInfo-container .deduct{
    background-color: #fff;
    border: 1px solid black;
    width:400px;
    height: 20px;
    font-size: 15px;
    margin: 0;
    padding: 0; 
    color: red;
  }

  .titleInfo-container .total{
    background-color: #fff;
    border: 1px solid black;
    width:400px;
    height: 20px;
    font-size: 18px;
    color: red;
    margin: 0;
    padding: 0; 
  }

  .titleInfo-container .totalAmount{
    background-color: #fff;
    border: 1px solid black;
    width:200px;
    height: 20px;
    font-size: 18px;
    color: red;
    margin: 0;
    padding: 0; 
  }

  .titleInfo-container .Meter{
    background-color: #fff;
    border: 1px solid;
    width:200px;
    height: 20px;
    font-size: 18px;
    font-size: 15px;
    margin: 0;
    padding: 0; 
  }

  .titleInfo-container .unit{
    background-color: #fff;
    border: 1px solid;
    width:150px;
    height: 20px;
    font-size: 15px;
    margin: 0;
    padding: 0; 
  }

  .info-container{
    text-align: center;
    background-color: #fff;
    width:100%;
  }

  .paymentInfo-container{
    width:100%;
  }
  .info-container h3{
    background-color: #fff;
    margin: 0;
    padding: 0; 
  }

  .QRcode-container{
    text-align: center;
    background-color: #fff;
    width:100%;
    
  }

  .QRcode-container .QRcode{
    width:209px;
    height:auto;
  }
`);

export default GenerateBillStyles;
