import PropTypes from "prop-types";
import { filesServerUrl } from "../../redux/api/authApi";
import { useState } from "react";
import {
  useCreateCommentMutation,
  useDeletePostMutation,
  useLikePostMutation,
} from "../../redux/api/postApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  comment: yup.string().required("Please, fill this field"),
});

export default function PostItem({ post = {} }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showCommentsBlock, setShowCommentsBlock] = useState(false);

  const [deletePost] = useDeletePostMutation();
  const userId = useSelector((state) => state.user.user._id);
  const [likePost] = useLikePostMutation();
  const [createComment] = useCreateCommentMutation();

  const creationDate = new Date(post.createdAt);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const creationMonth = month[creationDate.getMonth()];
  const creationDayDate = creationDate.getDate();
  const creationYear = creationDate.getFullYear();
  const creationHours = creationDate.getHours();
  const creationMinutes = creationDate.getMinutes();
  const creationMinutesForamatted =
    creationMinutes < 10 ? `0${creationMinutes}` : creationMinutes;

  const handleDeletePost = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirm) return;

    try {
      await deletePost(post._id).unwrap();
      toast.success("Post was deleted!", {
        draggable: true,
      });
    } catch (e) {
      toast.error(e.data.message, {
        draggable: true,
      });
    }
  };

  const likePostHandler = async () => {
    try {
      await likePost(post._id).unwrap();
    } catch (e) {
      toast.error(e.error.data.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postComment = async (values) => {
    try {
      await createComment({ postId: post._id, text: values.comment }).unwrap();
    } catch (e) {
      toast.error(e.error.data.message);
    }
  };

  return (
    <article
      style={{ border: "1px solid #e2e2e2", borderRadius: "4px" }}
      className="pl-6 pr-6 pt-4 pb-3 mt-4 text-base relative bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={`${filesServerUrl}/avatar/${post.user.avatar}`}
              alt={post.user.username}
            />
            <span>{post.user.username}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time>
              {creationMonth}. {creationDayDate}, {creationYear} {creationHours}
              :{creationMinutesForamatted}
            </time>
          </p>
        </div>
        <button
          id="dropdownComment3Button"
          data-dropdown-toggle="dropdownComment3"
          onClick={() => setShowDropDown(!showDropDown)}
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>
        {/* <!-- Dropdown menu --> */}
        <div
          style={{
            border: "1px solid #e2e2e2",
            borderRadius: "4px",
            right: "-20px",
            top: "65px",
          }}
          className={`${
            !showDropDown ? "hidden" : ""
          } absolute z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            {userId === post.user._id && (
              <>
                <li>
                  <div className="block py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Edit
                  </div>
                </li>
                <li>
                  <div
                    className="block py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleDeletePost}
                  >
                    Remove
                  </div>
                </li>
              </>
            )}

            <li>
              <div className="block py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Report
              </div>
            </li>
          </ul>
        </div>
      </div>

      {post.image && (
        <img
          src={`${filesServerUrl}/posts/${post.image}`}
          alt=""
          className="max-w-80 max-h-80 object-contain"
        />
      )}
      <p>{post.text}</p>
      <hr />
      <div className="flex items-center gap-2 mt-2">
        <div
          className="flex items-center cursor-pointer gap-1"
          onClick={likePostHandler}
        >
          <FontAwesomeIcon
            style={{
              color: post.likedByCurrentUser ? "red" : "black",
              fontSize: "20px",
            }}
            icon={post.likedByCurrentUser ? faHeartSolid : faHeartRegular}
          />

          <span
            style={{
              color: post.likedByCurrentUser ? "red" : "black",
              fontWeight: post.likedByCurrentUser ? "600" : "400",
              lineHeight: "14px",
            }}
          >
            {post.likesCount}
          </span>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faCommentDots}
            style={{ fontSize: "20px" }}
            className="cursor-pointer"
            onClick={() => setShowCommentsBlock(!showCommentsBlock)}
          />
        </div>
      </div>
      {showCommentsBlock && (
        <form
          className="text-gray-600 body-font relative"
          onSubmit={handleSubmit(postComment)}
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
      )}
    </article>
  );
}

PostItem.propTypes = {
  post: PropTypes.object,
};
