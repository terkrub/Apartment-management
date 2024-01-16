const Meter = require('../models/meter')
const {getLastMeterInfo, addMeterInfo, getCurrentMeterInfo, updateMeterInfo} = require('../services/meterInfoService')
const {getRoomInfo} = require('../services/addRoomInfo')

const getMeterInfoController = async(req,res)=>{
    const lastMeterInfo = await getLastMeterInfo(req.body.roomNumber)
    const currentMeterInfo = await getCurrentMeterInfo(req.body.roomNumber)
    const roomInfo = await getRoomInfo(req.body.roomNumber)
    res.json({currentMeterResult: currentMeterInfo, lastMeterResult: lastMeterInfo, roomInfo: roomInfo})
}

const addMeterInfoController = async(req,res) =>{
    if(!req.body.lastMeter._id && !req.body.currentMeter._id){
        await addMeterInfo(req.body.roomInfo.roomNumber, req.body.currentMeter)
        await addMeterInfo(req.body.roomInfo.roomNumber, req.body.lastMeter)
        res.json({status: "Success"})
    }
    else if(!req.body.lastMeter._id && req.body.currentMeter._id){
        await addMeterInfo(req.body.roomInfo.roomNumber, req.body.lastMeter)
        await updateMeterInfo(req.body.currentMeter)
        res.json({status: "Success"})
    }
    else if(req.body.lastMeter._id && !req.body.currentMeter._id){
        await updateMeterInfo(req.body.lastMeter)
        await addMeterInfo(req.body.roomInfo.roomNumber, req.body.currentMeter)
        res.json({status: "Success"})
    }
    else if(req.body.lastMeter._id && req.body.currentMeter._id){
        console.log('yes')
        await updateMeterInfo(req.body.lastMeter)
        await updateMeterInfo(req.body.currentMeter)
        res.json({status: "Success"})
    }

    /*
    const current_meter = await getCurrentMeterInfo(req.body.roomNumber)
    if(!current_meter){
        const meterInfo = await addMeterInfo(req.body.roomNumber, req.body.ElectricMeter, req.body.WaterMeter)
        res.json({result: meterInfo})
    }else{
        const updatedData ={
            'roomNumber': req.body.roomNumber,
            'ElectricMeter': req.body.ElectricMeter,
            'WaterMeter': req.body.WaterMeter,
            'date': new Date()
        }
        const meterInfo = await updateCurentMeterInfo(req.body.roomNumber, updatedData)
        res.json({result: meterInfo})
    }
    */

}

module.exports={getMeterInfoController, addMeterInfoController}