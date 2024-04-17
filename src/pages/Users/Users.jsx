import Container from "../../components/Container/Container";
import UserItem from "../../components/UserItem/UserItem";
import { useGetUsersQuery } from "../../redux/api/userApi";

export default function Users() {
  const { data: users, isLoading } = useGetUsersQuery({ page: 1, limit: 20 });
  if (isLoading) {
    return "Loading...";
  }

  return (
    <Container>
      <div className="flex flex-wrap justify-between">
      {users.map((user) => (
        <UserItem key={user._id} user={user} />
      ))}
      </div>
    </Container>
  );
}
