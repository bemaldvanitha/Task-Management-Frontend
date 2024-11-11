import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CiBellOn } from "react-icons/ci";
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import NotificationsDrawer from "../../notifications/NotificationsDrawer";

import './CustomNavbar.css';

const CustomNavbar = ({ isAdmin }) => {
    const navigate = useNavigate();
    const [isNotificationBarOpen, setIsNotificationBarOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openNotificationBar = () => {
        setIsNotificationBarOpen(true);
    }

    const closeNotificationBar = () => {
        setIsNotificationBarOpen(false);
    }

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('type');
        navigate('/login');
    }

    const changePasswordHandler = () => {
        navigate('/password');
    }

    return (
        <div className={'navBar'}>
            <div className={'navBarHeaderContainer'}>
                <Link to="/">
                    <p className={'navBarHeader'}>Task Management</p>
                </Link>
            </div>
            <div className={'navBarActionContainer'}>
                <div>
                    <CiBellOn className={'navbar-icon'} onClick={openNotificationBar}/>
                </div>
                {isAdmin && <Link to="/admin">
                    <p className={'navBarAction'}>Admin</p>
                </Link>}
                <div className={'custom-navbar-right-container'}>
                    <img src={'https://images.pexels.com/photos/16373111/pexels-photo-16373111/free-photo-of-sunlight-over-dirt-road-in-forest-in-winter.jpeg'}
                         alt={'profile-pic'} className={'custom-navbar-profile-pic'}
                         onClick={handleClick}/>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem onClick={changePasswordHandler}>Change Password</MenuItem>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
            {isNotificationBarOpen && <NotificationsDrawer isOpen={isNotificationBarOpen}
                                                           closeHandler={closeNotificationBar}/>}
        </div>
    );
};

export default CustomNavbar;