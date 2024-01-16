require('dotenv').config()

const getConfig = {
    'PORT': parseInt(process.env.PORT),
    'DB_URL': process.env.DB_URL,
    'SALTBOUNDS': parseInt(process.env.saltBounds),
    'secret': process.env.secret
}

module.exports = getConfig;