require('dotenv').config()

const getConfig = {
    'PORT': parseInt(process.env.PORT),
    'LaithongHouse': process.env.LaithongHouse,
    'LaithongResort':process.env.LaithongResort,
    'SALTBOUNDS': parseInt(process.env.saltBounds),
    'secret': process.env.secret
}

module.exports = getConfig;