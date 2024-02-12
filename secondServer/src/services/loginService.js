const User = require('../models/user');

const loginService = async (username) => {

    user = await User.findOne({username: username});
    return user;
}


module.exports = loginService;