import { useSelector } from "react-redux";
import { useGetMeQuery } from "../redux/api/userApi";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const { isLoading, isSuccess } = useGetMeQuery(null, {
    skip: token === null,
  });
  const { user } = useSelector((state) => state.user);

  if (isLoading) {
    return "Loading...";
  }

  if (isSuccess && user) {
    return children;
  }

  return <Navigate to="/login" />;
}
