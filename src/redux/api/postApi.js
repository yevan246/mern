import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { apiUrl } from './authApi'

export const postApiSlice = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiUrl}/posts`,
        prepareHeaders: (headers, {getState}) => {
            const token = getState().user.token
            if(token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        uploadPhoto: builder.mutation({
            query: (photo) => {
                const formData = new FormData()
                formData.append('photo', photo)

                return {
                    url: '/upload_photo',
                    method: 'POST',
                    body: formData,
                }

            }
        }),
        createPost: builder.mutation({
            query: (data) => {
                return {
                    url: '/',
                    method: 'POST',
                    body: data,
                }

            }
        }),

    })

})

export const {useUploadPhotoMutation, useCreatePostMutation} = postApiSlice