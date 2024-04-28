import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "./authApi";
import { toast } from "react-toastify";
import { addUserPost } from "../features/postsSlice";

export const postApiSlice = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/posts`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadPhoto: builder.mutation({
      query: (photo) => {
        const formData = new FormData();
        formData.append("photo", photo);

        return {
          url: "/upload_photo",
          method: "POST",
          body: formData,
        };
      },
    }),
    createPost: builder.mutation({
      query: (data) => {
        return {
          url: "/",
          method: "POST",
          body: data,
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const {data} = await queryFulfilled;
          dispatch(addUserPost(data.post));
        } catch (e) {
          toast.error(e.error.data.message);
        }
      },
    }),
    deletePost: builder.mutation({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "DELETE",
        };
      },
    }),
    likePost: builder.mutation({
      query: (postId) => {
        return {
          url: `${postId}/like`,
          method: "POST"
        };
      },
      // onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
      //   try {
      //     const {data} = await queryFulfilled;
      //     dispatch(addUserPost(data.post));
      //   } catch (e) {
      //     toast.error(e.error.data.message);
      //   }
      // },
    }),

  }),
});

export const {
  useUploadPhotoMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useLikePostMutation
} = postApiSlice;
