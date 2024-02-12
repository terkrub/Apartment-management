const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const getconfig = require('./src/config/config');
const router = require('./src/routes/routes');



const app = express();

app.use(bodyParser.json());
app.use(router);

app.listen(4700,function (){
  console.log(`CORS-enabled web server listening on port ${4700}`);
});
