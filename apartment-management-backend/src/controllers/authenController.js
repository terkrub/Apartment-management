const jwt = require('jsonwebtoken')
const getconfig = require('../config/config')

async function authenMiddleware (req, res, next){
    
    try{
        const token = req.header('Authorization')
        const decode = jwt.verify(token.split(" ")[1], getconfig.secret)
        return res.json({
            isAuthenticated: true,
            username: decode.username
        })
    }catch{
        return res.status(401).json({isAuthenticated: false})
    }

}

module.exports = authenMiddleware
