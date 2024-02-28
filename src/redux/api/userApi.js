import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { apiUrl } from './authApi'

export const userApiSlice = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiUrl}/users`,
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
        }),
    })
})

export const {useGetMeQuery} = userApiSlice