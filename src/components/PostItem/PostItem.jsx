import PropTypes from "prop-types";
import { filesServerUrl } from "../../redux/api/authApi";
import { useState } from "react";
import { useDeletePostMutation } from "../../redux/api/postApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function PostItem({ post = {} }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [deletePost] = useDeletePostMutation();
  const userId = useSelector((state) => state.user.user._id);

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
    </article>
  );
}

PostItem.propTypes = {
  post: PropTypes.object,
};
