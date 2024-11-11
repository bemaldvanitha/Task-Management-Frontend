import { apiSlice } from "./apiSlice";

import { AUTH_URL } from "../configuration";

const getToken = () => localStorage.getItem('token');
const getRefreshToken = () => localStorage.getItem('refreshToken');

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: body
            })
        }),
        signup: builder.mutation({
            query: (body) => ({
                url: `${AUTH_URL}/signup`,
                method: "POST",
                body: body
            })
        }),
        revalidateToken: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/revalidate`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'x-auth-token': getToken(),
                    'x-refresh-auth-token': getRefreshToken()
                },
                //credentials: "include",
            })
        }),
        fetchAllUsers: builder.query({
            query: () => ({
                url: `${AUTH_URL}/users`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'x-auth-token': getToken(),
                },
                //credentials: "include",
            }),
            keepUnusedDataFor: 2
        }),
        passwordReset: builder.mutation({
            query: (body) => ({
                url: `${AUTH_URL}/reset`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'x-auth-token': getToken(),
                },
                //credentials: "include",
                body: body
            })
        })
    })
});

export const { useLoginMutation, useSignupMutation, useRevalidateTokenMutation, useFetchAllUsersQuery,
    usePasswordResetMutation } = authApiSlice;