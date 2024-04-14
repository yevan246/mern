import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { filesServerUrl } from "../../redux/api/authApi";
import { useEffect, useState } from "react";
import Container from "../Container/Container";
import { logoutUser } from "../../redux/features/userSlice";

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const clickEventListener = () => {
    setIsMenuOpen(false)      
  }

  useEffect(() => {
    if(isMenuOpen) {
      setTimeout(() => document.addEventListener('click', clickEventListener), 1)
    }
    return () => document.removeEventListener('click', clickEventListener)
  }, [isMenuOpen])

  const userLogout = (e) => {
    e.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <div className="shadow-xl bg-white">
      <Container className="flex items-center justify-between	 lg:order-2 py-5 ">
        <NavLink
          className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50"
          to="/"
        >
          To Do List
        </NavLink>
        <NavLink
          className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50"
          to="/users"
        >
          Users
        </NavLink>
        {!user ? (
          <div>
            <NavLink
              className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50"
              to="/signup"
            >
              Sign Up
            </NavLink>
            <NavLink
              className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50"
              to="/login"
            >
              Log In
            </NavLink>
          </div>
        ) : (
          <>
          <div
            className="flex items-center gap-2 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img
              className="w-10 h-10 rounded-full"
              src={`${filesServerUrl}/avatar/${user.avatar}`}
              alt=""
            />
            {user.username}

          </div>
            <div
              id="dropdown"
              style={{top: '80px', zIndex: 100}}
              className={`z-10 ${!isMenuOpen ? 'hidden' : ''} shadow-xl absolute right-14 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Profile
                  </NavLink>
                </li>
               
                <li>
                  <NavLink
                    to="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={userLogout}
                  >
                    Sign out
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
