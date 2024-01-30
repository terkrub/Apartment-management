import './OverallStatusStyles.css'
import Icon from '../icon/StatIcon'

const OverallStatus = ()=>{
    return(
        <div className="StatusContainer">
            <div className="incomeStat">
                <Icon.IncomeIcon/>
                <div>
                    <span>รายรับ</span>
                    <a>xxx บาท</a>
                </div>  
            </div>
            <div className="enpenseStat">
                <Icon.ExpenseIcon/>
                <div>
                    <span>รายจ่าย</span>
                    <a>xxx บาท</a>
                </div>
            </div>
            <div className="profitStat">
                <Icon.ProfitIcon/>
                <div>
                    <span>คงเหลือ</span>
                    <a>xxx บาท</a>
                </div>
            </div>
            <div className="AvaRoomStat">
                <Icon.DoorIcon/>
                <div>
                    <span>จำนวนห้องว่าง</span>
                    <a>xxx ห้อง</a>
                </div>
            </div>
            <div className="maintainStat">
                <Icon.BuildIcon/>
                <div>
                    <span>จำนวนเรืองซ่อม</span>
                    <a>xxx เรือง</a>
                </div>
            </div>
        </div>
    )
}

export default OverallStatus;