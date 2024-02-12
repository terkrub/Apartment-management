const Room = require("../models/room")


const addRoomInfo = async (roomNum,updatedData) => {
    const room = await Room.findOneAndUpdate({ roomNumber: roomNum }, { $set: updatedData }, { new: true })
    return room
}

const addRommtem = async () =>{
    for(let i = 1;i<=16;i++){
        const room = new Room({
            'roomNumber': "A"+i,
            'rentalName': null,
            'rentalPhone': null,
            'totalKey': null,
            'startDate':null,
            'totalDeposit':null,
            'exitDate' : null,
            'keyExpireDate':null,
            'available':true,
            'paid':false,
            'roomPrice': 3500
        })
        console.log(i);

        await room.save()
    }
    for(let i = 1;i<=16;i++){
        const room = new Room({
            'roomNumber': "B"+i,
            'rentalName': null,
            'rentalPhone': null,
            'totalKey': null,
            'startDate':null,
            'totalDeposit':null,
            'exitDate' : null,
            'keyExpireDate':null,
            'available':true,
            'paid':false,
            'roomPrice': 3500
        })
        console.log(i);

        await room.save()
    }
    

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


module.exports = {addRoomInfo, getRoomInfo, updateRoomPrice, addRommtem}
