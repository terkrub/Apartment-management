const loginService = require("../services/loginService")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getconfig = require('../config/config')

const handleError = (res, message) => {
    res.json({status: 'error', message: message});
    console.log("No user found")
}

const loginController = async (req,res) =>{
    const user = await loginService(req.body.username.toLowerCase());
    console.log(req.body.username.toLowerCase())
    if(user){
        const isLogin = await bcrypt.compare(req.body.password, user.password);
        if(isLogin){
            const token = jwt.sign({ username: user.username}, getconfig.secret,{ expiresIn: '1d' });
            res.json({status: 'Success',token: token});
        }else
            handleError(res, "Invalid password")
        
    }else
        handleError(res, "Username not found")
}



module.exports = loginController
