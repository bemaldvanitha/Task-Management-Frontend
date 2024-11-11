import { apiSlice } from "./apiSlice";

import { ADMIN_URL } from "../configuration";

const getToken = () => localStorage.getItem('token');

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchAdminStats: builder.query({
            query: () => ({
                url: ADMIN_URL,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'x-auth-token': getToken(),
                },
                //credentials: "include",
            }),
            keepUnusedDataFor: 2
        }),
    })
});

export const { useFetchAdminStatsQuery } = adminApiSlice;