import { useEffect, useState } from 'react'
import './SidebarStyles.css'
import Icon from './icon/SidebarIcon'
import axios from '../api/axios'

const Sidebar =({active})=>{
    const[branch,setBranch] = useState(null)
    
    useEffect(()=>{
        
        setBranch(localStorage.getItem('branch') ===null ? 'LaithongHouse': localStorage.getItem('branch'))
    },[])

    return(
        <div className='sidebarContainer'>
            <div className='logoContainer'>
                <img className={branch==="LaithongResort"?'form-logo-resort':'form-logo'} src={require('../img/Laithonghouse-logo-RM-BG.png')}/>
            </div>
            <ul>
                <li className={active === "home" ? 'sidebar-selected':'sidebar'}>
                    <a href="/">
                        <div>
                            <Icon.HomeIcon active={active}/>
                            <span>หน้าแรก</span>
                        </div>
                    </a>
                </li>

                <li className={active === "roomInfo" ? 'sidebar-selected':'sidebar'}>
                    <a href="/roomInfo">
                        <div>
                            <Icon.RoomInfoIcon active={active}/>
                            <span>ข้อมูลห้อง</span>
                        </div>
                    </a>
                </li>
{/*
                <li className={active === "maintain" ? 'sidebar-selected':'sidebar'}>
                    <a href="/maintenance">
                        <div>
                            <Icon.BuildIcon active={active}/>
                            <span>แจ้งซ่อม</span>
                        </div>
                    </a>
                </li>
*/}
                <li className={active === "bill" ? 'sidebar-selected':'sidebar'}>
                    <a href="/bill">
                        <div>
                            <Icon.BillIcon active={active}/>
                            <span>ออกบิล</span>
                        </div>
                    </a>
                </li>
                
            </ul>
            <div className='chnageBranchContainer'>
                <h3>{branch}</h3>
                <a href="/selectBranch">
                    เปลี่ยนหอ
                </a>
            </div>
        </div>
    )
}

export default Sidebar