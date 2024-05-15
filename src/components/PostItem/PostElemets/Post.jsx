import PropTypes from "prop-types";
import {
  useCreateCommentMutation,
  useDeletePostMutation,
  useLikePostMutation,
} from "../../../redux/api/postApi";
import { PostProvider } from "./PostContext";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import PostCommentBlock from "./PostCommentBlock";

function Post({children, post}) {
  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const [createComment] = useCreateCommentMutation();

  return (
    <article
      style={{ border: "1px solid #e2e2e2", borderRadius: "4px" }}
      className="pl-6 pr-6 pt-4 pb-3 mt-4 text-base relative bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
    >
      <PostProvider post={post} createComment={createComment} deletePost={deletePost} likePost={likePost}>
        {children}
      </PostProvider>
    </article>
  )
}

Object.assign(Post, {
  Header: PostHeader,
  Content: PostContent,
  Actions: PostActions,
  CommentsBlock: PostCommentBlock
})

export default Post;

Post.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
]).isRequired,
  post: PropTypes.object.isRequired,
};
