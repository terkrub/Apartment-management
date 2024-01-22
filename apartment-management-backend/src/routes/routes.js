const express = require('express')
const router = express.Router()
const {addRoomInfoController, getRoomInfoController, updateRoomPrceController} = require('../controllers/addRoomInfoController')
const authenController = require('../controllers/authenController')
const loginController = require('../controllers/loginController')
const { getMeterInfoController, addMeterInfoController } = require('../controllers/meterInfoController')
const authenMiddleware = require('../middleware/authenMiddleware')
const {addIncomeController} = require('../controllers/IncomeInfoController')

router.post("/Login", loginController)
router.get("/Authen", authenController)
router.post("/RoomInfo", authenMiddleware,getRoomInfoController)
router.post("/addInfo",addRoomInfoController)
router.post("/MeterInfo", authenMiddleware, getMeterInfoController)
router.post("/AddMeter",authenMiddleware, addMeterInfoController)
router.post("/addIncome",authenMiddleware, addIncomeController)
router.post("/updatePrice",authenMiddleware, updateRoomPrceController)

module.exports = router;