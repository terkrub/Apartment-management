const mongoose = require('mongoose');
const Meter = require('../models/meter');
const { pool } = require('../db');

const getLastMeterInfo = async (roomNumber) => {
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const targetMonth = lastMonth.getMonth() + 1
  const targetYear = lastMonth.getFullYear()
  const meter = Meter.find({
    roomNumber: roomNumber,
    $expr: {
      $and: [
        { $eq: [{ $month: '$date' }, targetMonth] },
        { $eq: [{ $year: '$date' }, targetYear] }
      ]
    }
  })

  return meter
}

const getDigitalMeter = ()=>{
  return pool.query('SELECT * FROM `cplcdm`.`unit` ORDER BY `tb_datetime` DESC LIMIT 1').then(([row,fields])=>{
    return row
  })
}

const getLastMeterCLean = async (roomNumber) => {
  console.log(roomNumber)
  const meter = await Meter.findOne({
    roomNumber: roomNumber
  })
  .sort({ date: -1 })
  .limit(1);
  console.log(meter)
  return meter;
}

const getCurrentMeterInfo = async (roomNumber) => {
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth())
  const targetMonth = lastMonth.getMonth() + 1
  const targetYear = lastMonth.getFullYear()
  const meter = Meter.find({
    roomNumber: roomNumber,
    $expr: {
      $and: [
        { $eq: [{ $month: '$date' }, targetMonth] },
        { $eq: [{ $year: '$date' }, targetYear] }
      ]
    }
  })

  return meter
}

const addMeterInfo = async (roomNumber, newMeterInfo) => {
  const meterInfo = new Meter({
    'roomNumber': roomNumber,
    'ElectricMeter': newMeterInfo.ElectricMeter,
    'WaterMeter': newMeterInfo.WaterMeter,
    'date': newMeterInfo.date
  })

  return meterInfo.save()
}

const updateMeterInfo = async (updateData) => {
  const updateDataCopy = { ...updateData }; // create a copy of updateData
  delete updateDataCopy._id; // remove _id from the copied object
  const id = new mongoose.Types.ObjectId(updateData._id);
  const meter = await Meter.findOneAndUpdate({ _id: id }, { $set: updateDataCopy })
  return meter
}

module.exports = { getLastMeterInfo, addMeterInfo, getCurrentMeterInfo, updateMeterInfo, getDigitalMeter , getLastMeterCLean}