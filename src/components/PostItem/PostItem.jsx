import PropTypes from "prop-types";
import Post from "./PostElemets/Post";

export default function PostItem({ post = {} }) {
  return (
    <Post post={post}>
      <Post.Header />
      <Post.Content />
      <Post.Actions />
      <Post.CommentsBlock />
    </Post>
  );
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};
