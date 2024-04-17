import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "./authApi";
import { logoutUser, setUser, updateUser } from "../features/userSlice";
import { toast } from "react-toastify";
import { setUserPosts, setUserPostsLoading } from "../features/postsSlice";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/users`, // /users/asdsfsfsdf/posts
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/getMe",
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (e) {
          toast.error(e.error.data.message);
          dispatch(logoutUser());
        }
      },
    }),

    getPostsByUserId: builder.query({
      query: ({ userId, page, limit }) =>
        `/${userId}/posts?page=${page}&limit=${limit}`,
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          try {
            dispatch(setUserPostsLoading(true));
            const {data} = await queryFulfilled;
            dispatch(setUserPosts(data));
            dispatch(setUserPostsLoading(false));
          } catch (e) {
            toast.error(e.error.data.message);
          }
        },
    }),

    getUsers: builder.query({
      query: ({ page, limit }) => `/?page=${page}&limit=${limit}`,
    }),

    getUserById: builder.query({
      query: (id) => `/${id}`,
    }),

    uploadProfileAvatar: builder.mutation({
      query: (photo) => {
        const formData = new FormData();
        formData.append("photo", photo);

        return {
          url: "/upload_avatar",
          method: "POST",
          body: formData,
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateUser({ avatar: data.file }));
        } catch (e) {
          toast.error(e.error.data.message);
        }
      },
    }),
  }),
});


export const {
  useGetMeQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetPostsByUserIdQuery,
  useUploadProfileAvatarMutation,
} = userApiSlice;
