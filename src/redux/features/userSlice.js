import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, 
    token: localStorage.getItem('token') 
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
            if(action.payload.token !== undefined) {
                state.token = action.payload.token
                localStorage.setItem('token', action.payload.token)
            }
        },
        updateUser: (state, action) => {
            state.user = {...state.user, ...action.payload}
        },
        updateFollowers: (state, action) => {
            state.user.following += action.payload
        },
        logoutUser: (state) => {
            localStorage.removeItem('token')
            state.user = null
            state.token = null
        }
    }
})

export const {setUser, updateUser, logoutUser, updateFollowers} = userSlice.actions