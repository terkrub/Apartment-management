import './ChangeBranchStyles.css'
import { useNavigate } from "react-router-dom";

const ChangeBranch=()=>{
    const navigate = useNavigate()
    const handleSelectLaithongResort =()=>{
        localStorage.setItem('branch','LaithongResort')
        navigate("/")
    }
    const handleSelectLaithongHouse =()=>{
        localStorage.setItem('branch','LaithongHouse')
        navigate("/")
    }
    return(
        <div className="App">
            <div className="selectBranchContainer">
                <div className="LaithongHouseImgContainer" onClick={handleSelectLaithongHouse}>
                    <img className='LaithongHouseImg' src={require('./img/Laithonghouse-logo-RM-BG.png')}/>
                </div>
                <div className="LaithongResortImgContainer" onClick={handleSelectLaithongResort}>
                    <img className='LaithongResortImg' src={require('./img/Laithonghouse-logo-RM-BG.png')}/>
                </div>
            </div>
        </div>
    )
}

export default ChangeBranch