import './RoomStatusStyles.css'

const RoomStatus=({total, available})=>{
    return(
        <div className="roomStatusContainer">
            <div className='roomStatus'>
                <h3>ห้องทั้งหมด:</h3>
                <a> {total}</a>
                <h3>จำนวนห้องว่าง:</h3>
                <a> {available}</a>
            </div>
        </div>
    )
}

export default RoomStatus