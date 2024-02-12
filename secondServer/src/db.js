const mongoose = require('mongoose');
const getconfig = require('./config/config');

// Initial connection
mongoose.connect(getconfig.LaithongHouse, { useNewUrlParser: true, useUnifiedTopology: true });

const changeDBMidleware = async (req, res, next) => {
    const dbName = req.body.dbName;
    const currentDbName = mongoose.connection.name;
    const state = mongoose.connection.readyState;

    if (state === 2) {
        await mongoose.disconnect();
        
    }

    if (dbName === "LaithongHouse" && currentDbName === "test") {
        console.log(`Already connected to ${dbName} database`);
        if(state === 1){
            console.log(state)
            return next()
        }
    }
    if(currentDbName === "LaithongHouseResort" && dbName === "LaithongResort"){
        console.log(`Already connected to ${dbName} database`);
        if(state === 1)
            return next()
    }

    try {
        console.log(state)
        await mongoose.disconnect();
        await mongoose.connect(getconfig[dbName], { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Switched to ${dbName} database`);
        next();
    } catch (err) {
        console.error('Error connecting to database:', err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { changeDBMidleware };
