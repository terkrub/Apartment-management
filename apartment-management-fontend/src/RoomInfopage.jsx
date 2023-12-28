import Sidebar from "./components/Sidebar"
import RoomInfoTable from "./components/roomInfo-page/RoomInfoTable.jsx"
import RoomStatus from "./components/roomInfo-page/RoomStatus.jsx"

const RoomInfopage=()=>{
    return(
        <div className="App">
            <aside>
                <Sidebar active={'roomInfo'}/>
            </aside>
            <section>
                <RoomStatus/>
                <RoomInfoTable/>
            </section>
        </div>
    )
}

export default RoomInfopage