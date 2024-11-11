import { apiSlice } from "./apiSlice";

import { TASK_URL } from "../configuration";

const getToken = () => localStorage.getItem('token');

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        taskCreate: builder.mutation({
            query: (body) => ({
                url: TASK_URL,
                method: "POST",
                body: body,
                headers: {
                    "Content-Type": "application/json",
                    'x-auth-token': getToken(),
                },
                //credentials: "include",
            })
        }),
        taskComplete: builder.mutation({
            query: (id) => ({
                url: `${TASK_URL}/complete/${id}`,
                method: 'PATCH',
                body: {},
                headers: {
                    "Content-Type": "application/json",
                    'x-auth-token': getToken(),
                },
                //credentials: "include",
            })
        }),
        taskUpdate: builder.mutation({
            query: ({ id, body }) => {
                const url = `${TASK_URL}/${id}`;
                return {
                    url: url,
                    method: "PATCH",
                    body: body,
                    headers: {
                        "Content-Type": "application/json",
                        'x-auth-token': getToken(),
                    },
                    //credentials: "include",
                };
            }
        }),
        deleteTask: builder.mutation({
           query: (id) => ({
               url: `${TASK_URL}/${id}`,
               method: "DELETE",
               headers: {
                   "Content-Type": "application/json",
                   'x-auth-token': getToken(),
               },
               //credentials: "include",
           })
        }),
        fetchAssignedTasks: builder.query({
            query: ({ status, priority, sortBy, search, page = 1, pageSize = 10 }) => {
                // Create an object for the query parameters
                const params = {
                    page,
                    pageSize,
                };

                // Conditionally add parameters only if they have a valid value (not empty)
                if (status) params.status = status;
                if (priority) params.priority = priority;
                if (sortBy) params.sortBy = sortBy;
                if (search) params.search = search;

                return {
                    url: TASK_URL,
                    method: "GET",
                    params: params,
                    headers: {
                        "Content-Type": "application/json",
                        'x-auth-token': getToken(),
                    },
                    // credentials: "include",
                };
            },
            keepUnusedDataFor: 2,
        })
    })
});

export const { useTaskCreateMutation, useTaskCompleteMutation, useTaskUpdateMutation, useDeleteTaskMutation,
    useFetchAssignedTasksQuery } = taskApiSlice;