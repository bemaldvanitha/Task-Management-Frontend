import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../configuration";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if(result?.error && result?.error?.status === 401){
        localStorage.removeItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

        try {
            const revalidateResponse = await fetch('http://localhost:4000/api/auth/revalidate', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-refresh-auth-token': refreshToken
                },
            });

            const data = await revalidateResponse.json();

            if (revalidateResponse.ok && data.shortJwtToken) {
                localStorage.setItem('token', data.shortJwtToken);
                return baseQuery(args, api, extraOptions);
            } else {
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Revalidation failed:', error);
            window.location.href = '/login';
        }
    }
    if(result?.error && result?.error?.status === 403){
        window.history.back();
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({

    })
});