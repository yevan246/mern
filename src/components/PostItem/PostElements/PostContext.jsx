import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const PostContext = createContext();

export const PostProvider = ({
  children,
  post,
  deletePost,
  likePost,
  createComment,
}) => {
  const [showCommentsBlock, setShowCommentsBlock] = useState(false);
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

  const handleLikePost = async () => {
    try {
      await likePost(post._id).unwrap();
    } catch (e) {
      toast.error(e.error.data.message);
    }
  };

  const handlePostComment = async (values, reset) => {
    try {
      await createComment({ postId: post._id, text: values.comment }).unwrap();
      reset()
    } catch (e) {
      toast.error(e.error.data.message);
    }
  };
  return (
    <PostContext.Provider
      value={{
        post,
        handleDeletePost,
        handleLikePost,
        handlePostComment,
        showCommentsBlock,
        setShowCommentsBlock,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);

PostProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
]).isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
};
