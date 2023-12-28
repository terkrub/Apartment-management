import Sidebar from "./components/Sidebar"
import MaintainanceTable from "./components/maintain-page/MaintainanceTable"
import MantainanceStatus from "./components/maintain-page/MantainanceStatus"

const Maintainpage=()=>{
    return(
        <div className="App">
            <aside>
                <Sidebar active={'maintain'}/>
            </aside>
            <section>
                <MantainanceStatus/>
                <MaintainanceTable/>
            </section>
        </div>
    )
}

export default Maintainpage