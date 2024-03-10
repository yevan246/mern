import PropTypes from "prop-types";
import { filesServerUrl } from "../../redux/api/authApi";
import { NavLink } from "react-router-dom";

export default function UserItem({ user }) {
  const registeredAt = new Date(user.createdAt);
  const registeredAtDate =
    registeredAt.toLocaleDateString() + " " + registeredAt.toLocaleTimeString();
    
  return (
    <NavLink className="mt-8" to={`/users/${user._id}`}>
      <img src={`${filesServerUrl}/avatar/${user.avatar}`} alt="" />
      <b>{user.username}</b>
      <div>Registered at: {registeredAtDate}</div>
    </NavLink>
  );
}

UserItem.propTypes = {
  user: PropTypes.object,
};
