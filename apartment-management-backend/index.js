const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const getconfig = require('./src/config/config');
const router = require('./src/routes/routes');
require('./src/db');
const app = express();

app.use(cors({credentials: true,
  origin: true,}));


app.use(bodyParser.json());

app.use(router);


app.listen(getconfig.PORT,function (){
  console.log(`CORS-enabled web server listening on port ${getconfig.PORT}`);
});
