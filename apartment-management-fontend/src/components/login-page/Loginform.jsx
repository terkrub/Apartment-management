import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from "react-router-dom";
import './LoginformStyles.css';

const Loginform = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    localStorage.removeItem('token')

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            axios.post('/Login',JSON.stringify({ username: username, password: password }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }).then(res=>{
                if(res.data.status ==="Success"){
                    localStorage.setItem('token',res.data.token)
                    navigate("/")
                }
            })
           
        }catch{
            console.log("error")
        }
    };

  return (
    <div className="loginform-Container">
        <div className="loginform-Box">
            <form className='loginform' onSubmit={handleSubmit}>
                <img className='form-logo' src={require('../../img/Laithonghouse-logo-RM-BG.png')}/>
                <h2 className="form-title">Login</h2>
                <div className={'form-field'}>
                    <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    />

                </div>
                <div className={'form-field'}>
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">LOGIN</button>
    </form>
        </div>      
    </div>  												  	  	  	  	  	  	  	  	  	  	     
    )  
} 
    
export default Loginform; 