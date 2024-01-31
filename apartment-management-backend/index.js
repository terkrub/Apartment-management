const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const getconfig = require('./src/config/config');
const router = require('./src/routes/routes');
require('./src/db');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'apartment-management-fontend', 'build')));

app.use(bodyParser.json());

app.use(router);

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '..','apartment-management-fontend', 'build', 'index.html'));
});

app.listen(getconfig.PORT,function (){
  console.log(`CORS-enabled web server listening on port ${getconfig.PORT}`);
});
