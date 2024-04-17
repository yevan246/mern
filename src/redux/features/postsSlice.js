import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userPosts: [],  // posts from users page
    isUserPostsLoading: true,
    forYouPosts: [] // posts for main page
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setUserPostsLoading: (state, action) => {
            state.isUserPostsLoading = action.payload
        },
        setUserPosts: (state, action) => {
            state.userPosts = action.payload
        },
        addUserPost: (state, action) => {
            state.userPosts.unshift(action.payload)
        },
    }
})

export const {setUserPosts, addUserPost, setUserPostsLoading} = postsSlice.actions