const mongoose = require('mongoose')
const getconfig = require('./config/config')
const cron = require('node-cron');
const Room = require("./models/room")

const connection = mongoose.connect( getconfig.DB_URL , {useNewUrlParser: true});

cron.schedule('0 9 1 * *', () => {
    Room.updateMany({}, { $set: { paid: false } }, (err, res) => {
        if (err) console.log(err);
        else console.log(res);
    });
});

module.exports = connection;