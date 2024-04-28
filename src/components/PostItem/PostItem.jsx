import PropTypes from "prop-types";
import { filesServerUrl } from "../../redux/api/authApi";
import { useState } from "react";
import {
  useDeletePostMutation,
  useLikePostMutation,
} from "../../redux/api/postApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function PostItem({ post = {} }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [deletePost] = useDeletePostMutation();
  const userId = useSelector((state) => state.user.user._id);
  const [likePost] = useLikePostMutation();

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
      await likePost(post._id).unwrap()
    } catch (e) {
      toast.error(e.error.data.message);
    }
  }

  return (
    <article
      style={{ border: "1px solid #e2e2e2", borderRadius: "4px" }}
      className="p-6 mt-4 text-base relative bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
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
      <svg
        onClick={likePostHandler}
        xmlns="http://www.w3.org/2000/svg"
        fill={post.likedByCurrentUser ? 'red' : 'black'}
        height="20px"
        width="20px"
        version="1.1"
        id="Capa_1"
        viewBox="0 0 471.701 471.701"
      >
        <g>
          <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z" />
        </g>
      </svg>
      {post.likesCount}
    </article>
  );
}

PostItem.propTypes = {
  post: PropTypes.object,
};
