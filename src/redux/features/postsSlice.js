import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userPosts: [], // posts from users page
  isUserPostsLoading: true,
  forYouPosts: [], // posts for main page
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setUserPostsLoading: (state, action) => {
      state.isUserPostsLoading = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    addUserPost: (state, action) => {
      state.userPosts.unshift(action.payload);
    },
    updatePost: (state, action) => {
      const { postId, ...data } = action.payload;
      const postIndex = state.userPosts.findIndex(
        (post) => post._id === postId
      );

      if (postIndex !== -1) {
        for (const key in data) {
          state.userPosts[postIndex][key] = data[key];
        }
      }
    },
    addComment: (state, action) => {
      const postIndex = state.userPosts.findIndex(
        (post) => post._id === action.payload.post
      );
      state.userPosts[postIndex].comments.unshift(action.payload);
    },
  },
});

export const { 
  setUserPosts,
  addUserPost,
  setUserPostsLoading,
  updatePost,
  addComment
} =  postsSlice.actions;
