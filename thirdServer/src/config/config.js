require('dotenv').config()

const getConfig = {
    'PORT': parseInt(process.env.PORT),
    'LaithongHouse': process.env.LaithongHouse,
    'LaithongResort':process.env.LaithongResort,
    'SALTBOUNDS': parseInt(process.env.saltBounds),
    'secret': process.env.secret,
    'secret': process.env.secret,
    'host': process.env.host,
    'user': process.env.user,
    'password': process.env.password,
    'database': process.env.database
}


module.exports = getConfig;