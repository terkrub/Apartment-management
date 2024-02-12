const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const getconfig = require('./src/config/config');
const router = require('./src/routes/routes');
const mongoose = require('mongoose');

mongoose.connect(getconfig.LaithongHouse, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser.json());

app.use(router);

app.listen(4600,function (){
  console.log(`CORS-enabled web server listening on port ${4600}`);
});
