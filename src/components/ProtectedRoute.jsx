import { useSelector } from "react-redux";
import { useGetMeQuery } from "../redux/api/userApi";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";


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


ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};
