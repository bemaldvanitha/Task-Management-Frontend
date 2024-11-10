import React, { useState, useEffect }  from "react";
import { Outlet, Navigate } from "react-router-dom";

import CustomNavbar from "../common/nav-bar/CustomNavbar";

import './Routing.css';

const DriverRoute = () => {
    const [isAuth, setIsAuth] = useState(true);

    useEffect(() => {

    }, []);

    return isAuth ? <div className={'app-container'}>
        <CustomNavbar/>
        <main className={'main-content'}><Outlet/></main>
    </div> : <Navigate to={'/login'}/>
}

export default DriverRoute;