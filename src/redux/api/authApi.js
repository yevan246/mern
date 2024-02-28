import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const serverUrl = 'http://localhost:5000'

export const apiUrl = `${serverUrl}/api`
export const filesServerUrl = `${serverUrl}/static`

export const authApiSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiUrl}/users`
    }),
    endpoints: (builder) => ({
        userSignup: builder.mutation({
            query: (body) => ({
                url: '/signup',
                method: 'POST',
                body

            })
        }),
        
        userLogin: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            })
        })
       
    })
})

export const {useUserLoginMutation, useUserSignupMutation} = authApiSlice