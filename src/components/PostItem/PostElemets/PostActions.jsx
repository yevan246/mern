import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";
import { usePostContext } from "./PostContext";

export default function PostActions() {

    const {post, handleLikePost, setShowCommentsBlock, showCommentsBlock} = usePostContext()

  return (
    <>
      <div className="flex items-center gap-2 mt-2">
        <div
          className="flex items-center cursor-pointer gap-1"
          onClick={handleLikePost}
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
      
    </>
  );
}
