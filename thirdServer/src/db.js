const mongoose1 = require('mongoose');
const getconfig = require('./config/config');
const mysql = require('mysql2')
// Initial connection
const mongoose = mongoose1.createConnection(getconfig.LaithongResort, { useNewUrlParser: true, useUnifiedTopology: true });

const pool = mysql.createPool({
    host: getconfig.host,
    user: getconfig.user,
    password: getconfig.password,
    database: getconfig.database,
  });
  
module.exports = { mongoose, pool: pool.promise() };
  

