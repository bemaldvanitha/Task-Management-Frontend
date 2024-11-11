import React from 'react';
import { FaRegEye } from 'react-icons/fa'

import './NotificationItem.css';

const NotificationItem = ({ id, read, title, description, onMarkAsRead }) => {
    const handleMarkAsRead = () => {
        if (!read) {
            onMarkAsRead(id);
        }
    };

    return (
        <div className={`notification-item ${read ? 'read' : 'unread'}`} id={id}>
            <div className="notification-content">
                <h3 className="notification-title">{title}</h3>
                <p className="notification-description">{description}</p>
            </div>

            <FaRegEye className={`eye-icon ${read ? 'read' : 'unread'}`} onClick={handleMarkAsRead}/>
        </div>
    );
}

export default NotificationItem;
