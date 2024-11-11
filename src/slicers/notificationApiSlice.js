import { apiSlice } from "./apiSlice";

import { NOTIFICATION_URL } from "../configuration";

const getToken = () => localStorage.getItem('token');

export const notificationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchAllNotifications: builder.query({
            query: () => ({
                url: NOTIFICATION_URL,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'x-auth-token': getToken(),
                },
                //credentials: "include",
            }),
            keepUnusedDataFor: 2
        }),
        changeNotificationStatus: builder.mutation({
            query: (id) => ({
                url: `${NOTIFICATION_URL}/${id}`,
                method: "PATCH",
                body: {},
                headers: {
                    "Content-Type": "application/json",
                    'x-auth-token': getToken(),
                },
                //credentials: "include",
            })
        })
    })
});

export const { useFetchAllNotificationsQuery, useChangeNotificationStatusMutation } = notificationApiSlice;