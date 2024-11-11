import React, { useState, useEffect } from "react";
import {Drawer, message} from "antd";
import LoadingSpinner from "../common/loading/LoadingSpinner";

import { useChangeNotificationStatusMutation, useFetchAllNotificationsQuery
    } from "../../slicers/notificationApiSlice";

import './NotificationDrawer.css';
import NotificationItem from "./NotificationItem";

const NotificationsDrawer = ({ closeHandler, isOpen }) => {
    const [notifications, setNotifications] = useState([]);

    const { data: notificationData, isLoading: notificationIsLoading, refetch: notificationRefetch,
        error: notificationError } = useFetchAllNotificationsQuery();
    const [changeNotificationStatus, { isLoading: changeNotificationStatusIsLoading }] =
        useChangeNotificationStatusMutation();

    useEffect(() => {
        if(notificationData?.notifications){
            setNotifications(notificationData?.notifications);
        }
    }, [notificationData]);

    const markAsReadHandler = async (id) => {
        try {
            const res = await changeNotificationStatus(id).unwrap();
            console.log(res);
            message.success(res?.message || 'Notification mark as read successfully !');
            await notificationRefetch();
        }catch (err){
            console.log(err);
            message.error(err?.data?.message  || 'Notification mark as read failed !');
        }
    }

    return(
        <Drawer onClose={closeHandler} open={isOpen} className="custom-drawer">
            {(notificationIsLoading || changeNotificationStatusIsLoading) ? <LoadingSpinner/> :
                <div className={'custom-drawer-container'}>
                    { notifications.map((notification, index) => {
                        return (
                            <NotificationItem key={index} id={notification?.id} read={notification?.read}
                                              title={notification?.title} description={notification?.description}
                                              onMarkAsRead={markAsReadHandler}/>
                        )
                    })}
                    {notifications.length === 0 && <p className={'custom-drawer-text'}>No Notifications Left</p>}
                </div>}
        </Drawer>
    )
}

export default NotificationsDrawer;