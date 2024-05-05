import { useParams } from "react-router-dom";
import { useGetPostsByUserIdQuery, useGetUserByIdQuery } from "../../redux/api/userApi";
import { filesServerUrl } from "../../redux/api/authApi";
import Container from "../../components/Container/Container";
import PostItem from "../../components/PostItem/PostItem";
import { useSelector } from "react-redux";

export default function User() {
  const { id } = useParams();

  const { data: user, isLoading } = useGetUserByIdQuery(id);
  
  useGetPostsByUserIdQuery({
    userId: id,
    page: 1,
    limit: 10,
  });

  const {userPosts} = useSelector((state) => state.posts);

  if (isLoading) {
    return "Loading...";
  }
  return (
    <Container>
      <div className="flex gap-20 mt-10">
        <div>
          <img src={`${filesServerUrl}/avatar/${user.avatar}`} alt="" />
          <b>{user.username}</b>
        </div>
        <div>
          {userPosts.map((post) => <PostItem post={post} key={post._id} />)}
        </div>
      </div>
    </Container>
  );
}
