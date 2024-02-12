const mongoose1 = require('mongoose');
const getconfig = require('./config/config');

// Initial connection
const mongoose = mongoose1.createConnection(getconfig.LaithongResort, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
