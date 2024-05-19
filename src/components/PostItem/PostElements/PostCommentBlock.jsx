import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { usePostContext } from "./PostContext";
import { filesServerUrl } from "../../../redux/api/authApi";
import { getFormattedDate } from "./PostHeader";
import {NavLink} from 'react-router-dom'
import React from "react";

const schema = yup.object().shape({
  comment: yup.string().required("Please, fill this field"),
});

export default function PostCommentBlock() {
  const { post, showCommentsBlock, handlePostComment } = usePostContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <div>
      {showCommentsBlock && (
        <>
          <form
            className="text-gray-600 body-font relative"
            onSubmit={handleSubmit((values) => handlePostComment(values, reset))}
          >
            <div className=" bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
              <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                Comment
              </h2>
              <p className="leading-relaxed mb-5 text-gray-600">
                What do u think about this post?
              </p>
              <div className="relative mb-4">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  {...register("comment")}
                ></textarea>
                {errors.comment && (
                  <div className="text-xs mt-1 text-red-600">
                    {errors.comment.message}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Leave Comment
              </button>
            </div>
          </form>
          <div className="mt-6">
          {post.comments.map(comment => {
              const {
                creationMonth,
                creationDayDate,
                creationYear,
                creationHours,
                creationMinutes,
              } = getFormattedDate(comment.createdAt);
              
            return (
              <article key={comment._id} className="p-2 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <NavLink to={`/users/${comment.user._id}`} className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src={`${filesServerUrl}/avatar/${comment.user.avatar}`}
                        alt={comment.user.username}
                      />
                      {comment.user.username}
                    </NavLink>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {creationMonth}. {creationDayDate}, {creationYear} {creationHours}:{creationMinutes}
                    </p>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                {comment.text.split('\n').map((el, key) => <React.Fragment key={key}>{el}<br/></React.Fragment>)}
                </p>
              </article>
            )}
           )}
            </div>
        </>
      )}
    </div>
  );
}
