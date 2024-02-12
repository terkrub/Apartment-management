import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../api/axios';

const PrivateRoute = ({Component: Component}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        const branch = localStorage.getItem('branch');
        if (!token) {
            setIsAuthenticated(false);
            return;
        }
        

        axios.post('/Authen', {
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
        .then(res => {
            console.log(res.data)
            setIsAuthenticated(res.data.isAuthenticated)
        })
        .catch(error => {
            console.error('Error:', error);
            setIsAuthenticated(false);
        });

    }, []);

    if (isAuthenticated === null) {
        // Render a loading spinner or message
        return <div></div>;
    }
  
    return isAuthenticated ? <Component/> : <Navigate to="/login" />
};

export default PrivateRoute;