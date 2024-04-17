import PropTypes from "prop-types";
import { filesServerUrl } from "../../redux/api/authApi";
import { NavLink } from "react-router-dom";

export default function UserItem({ user }) {
  const registeredAt = new Date(user.createdAt);
  const registeredAtDate =
    registeredAt.toLocaleDateString() + " " + registeredAt.toLocaleTimeString();

  return (
    <NavLink
      to={`/users/${user._id}`}
      className="block rounded-lg bg-white w-56 mt-4"
    >
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <img
          className="rounded-lg  w-56 h-56"
          src={`${filesServerUrl}/avatar/${user.avatar}`}
          alt=""
        />
        <a href="#!">
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
        </a>
      </div>

      <div className="p-2">
        <div className="flex justify-between">
          <h5 className="mb-2 text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50">
            {user.username}
          </h5>
        </div>
        <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-200">
          Registered at: {registeredAtDate}
        </p>
        <h5 className="mb-2 text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50">
          Price per night
        </h5>
      </div>
    </NavLink>
  );
}

UserItem.propTypes = {
  user: PropTypes.object,
};
