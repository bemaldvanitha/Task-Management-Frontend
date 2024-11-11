import React, { useState, useEffect }  from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

import CustomNavbar from "../common/nav-bar/CustomNavbar";

import './Routing.css';

const PrivateRoute = () => {
    const navigate = useNavigate();

    const [isAuth, setIsAuth] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem('token');
        let type = localStorage.getItem('type');

        if(!token){
            navigate('/login')
        }

        if(type === 'Admin'){
            setIsAdmin(true)
        }
    }, [navigate]);

    return isAuth ? <div className={'app-container'}>
        <CustomNavbar isAdmin={isAdmin}/>
        <main className={'main-content'}><Outlet/></main>
    </div> : <Navigate to={'/login'}/>
}

export default PrivateRoute;