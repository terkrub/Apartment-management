const {addRoomInfo, getRoomInfo, updateRoomPrice} = require("../services/addRoomInfo");

const addRoomInfoController = async (req,res) =>{
    
    const updatedData = {
        rentalName: req.body.rentalName,
        rentalPhone: req.body.rentalPhone,
        totalKey: req.body.totalKey,
        startDate: req.body.startDate,
        totalDeposit: req.body.totalDeposit,
        exitDate: req.body.exitDate,
        keyExpireDate: req.body.keyExpireDate,
        available: req.body.rentalName == ""
    }

    console.log(req.body)

    const room = await addRoomInfo(req.body.roomNumber,updatedData);
    console.log(room)

    if(room != null)
        res.json({status: 'Success'});
    else
        handleError(res, "Invalid username or password")
}

const getRoomInfoController = async (req,res)=>{
    const {totalRooms, totalAvailable, room} = await getRoomInfo(req.body.roomNumber);
    res.json({total: totalRooms, available: totalAvailable, results: room})
}

const updateRoomPrceController = async(req,res)=>{
    const room = await updateRoomPrice(req.body.room, req.body.roomPrice)
    res.json({status: 'Success'})
}

module.exports = {addRoomInfoController,getRoomInfoController, updateRoomPrceController}
