const Room = require("../models/room")


const addRoomInfo = async (roomNum,updatedData) => {
    const room = await Room.findOneAndUpdate({ roomNumber: roomNum }, { $set: updatedData }, { new: true })
    return room
}


const getRoomInfo = async (searchParam) => {
    let room;
    if (searchParam) {
        room = await Room.find({roomNumber: searchParam}).sort({roomNumber: 1});
    } else {
        room = await Room.find().sort({roomNumber: 1});
    }
    const totalRooms = await Room.countDocuments();
    const totalAvailable = await Room.countDocuments({ available: true });
    return {totalRooms, totalAvailable, room};
}

const updateRoomPrice = async (roomNum, newPrice) => {
    try {
        const room = await Room.findOneAndUpdate({ roomNumber: roomNum }, { roomPrice: newPrice }, { new: true });
        return room;
    } catch (error) {
        console.error("Error updating room price:", error);
    }
    return room
}


module.exports = {addRoomInfo, getRoomInfo, updateRoomPrice}
