import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { apiUrl } from './authApi'
import { logoutUser, setUser } from '../features/userSlice'
import { toast } from 'react-toastify'

export const userApiSlice = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiUrl}/users`, // /users/asdsfsfsdf/posts
        prepareHeaders: (headers, {getState}) => {
            const token = getState().user.token
            if(token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => '/getMe',
            onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setUser(data))
                } catch(e) {
                    toast.error(e.error.data.message)
                    dispatch(logoutUser())
                }
            }
        }),

        getPostsByUserId: builder.query({
            query: ({userId, page, limit}) => `/${userId}/posts?page=${page}&limit=${limit}`
        }),
        
        getUsers: builder.query({
            query: ({page, limit}) => `/?page=${page}&limit=${limit}`
        }),

        getUserById: builder.query({
            query: (id) => `/${id}`
        }),

    })

})

export const {useGetMeQuery, useGetUsersQuery, useGetUserByIdQuery, useGetPostsByUserIdQuery} = userApiSlice