import { Navigate, useParams } from "react-router-dom";
import {
  useGetPostsByUserIdQuery,
  useGetUserByIdQuery,
} from "../../redux/api/userApi";
import { filesServerUrl } from "../../redux/api/authApi";
import Container from "../../components/Container/Container";
import PostItem from "../../components/PostItem/PostItem";
import { useSelector } from "react-redux";

export default function User() {
  const { id } = useParams();
  const userId = useSelector(store => store.user.user._id)
  
  const { data: user, isLoading } = useGetUserByIdQuery(id);

  useGetPostsByUserIdQuery({
    userId: id,
    page: 1,
    limit: 10,
  });

  const { userPosts } = useSelector((state) => state.posts);

  if(userId === id) {
    return <Navigate to='/profile' />
  }

  if (isLoading) {
    return "Loading...";
  }
  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-10 mt-10 ">
        <div className="flex flex-col self-start md:items-start md:w-1/3 bg-white rounded-lg p-4 border border-gray-200 dark:border-gray-700 ">
          <img
            src={`${filesServerUrl}/avatar/${user.avatar}`}
            alt={`${user.username}'s avatar`}
            className="h-64 mb-4"
          />
          <b className="text-2xl mb-2">{user.username}</b>
          <div className="text-gray-600 mb-1">Followers: {user.followers}</div>
          <div className="text-gray-600 mb-4">Following: {user.following}</div>
          <button
            className={`px-4 py-2 rounded-lg text-white ${
              user.isFollowedByTarget
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {user.isFollowedByTarget ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className="flex flex-col md:w-2/3">
          {userPosts.map((post) => (
            <PostItem post={post} key={post._id} className="mb-4 last:mb-0" />
          ))}
        </div>
      </div>
    </Container>
  );
}
