import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const todoApiSlice = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/todos/'}),
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/'
        }),
        addTodo: builder.mutation({
            query: (newTodo) => ({
                url: '/',
                method: 'POST',
                body: newTodo
            })
        })
    })
})

export const {useGetTodosQuery, useAddTodoMutation} = todoApiSlice