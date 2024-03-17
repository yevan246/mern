import UserItem from "../../components/UserItem/UserItem";
import { useGetUsersQuery } from "../../redux/api/userApi";

export default function Users() {
  const { data: users, isLoading } = useGetUsersQuery({ page: 1, limit: 20 });
  if (isLoading) {
    return "Loading...";
  }

  return (
    <div>
      {users.map((user) => (
        <UserItem key={user._id} user={user} />
      ))}
    </div>
  );
}
