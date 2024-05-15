import { filesServerUrl } from "../../../redux/api/authApi";
import { usePostContext } from "./PostContext";

export default function PostContent() {
  const {post} = usePostContext()

  return (
    <div>
      {post.image && (
        <img
          src={`${filesServerUrl}/posts/${post.image}`}
          alt=""
          className="max-w-80 max-h-80 object-contain"
        />
      )}
      <p>{post.text}</p>
      <hr />
    </div>
  );
}
