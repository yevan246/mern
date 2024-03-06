import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { filesServerUrl } from "../../redux/api/authApi";
import { useState } from "react";

export default function Header() {
  const {user} = useSelector((state) => state.user)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex items-center justify-between	 lg:order-2 py-5 shadow-xl">
        <NavLink className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50" to='/'>To Do List</NavLink>
        {!user ? (
          <div>
            <NavLink className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50" to='/signup'>Sign Up</NavLink>
            <NavLink className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50" to='/login'>Log In</NavLink>
          </div> 
        ) : (
          <div className="flex items-center gap-2 relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img className="w-10 h-10 rounded-full" src={`${filesServerUrl}/avatar/${user.avatar}`} alt="" />
            {user.username}


            {isMenuOpen && (
              <div className="absolute top-14 bg-white border border-black border-solid	 shadow-xl p-5 z-10" >
                bla bla bla
                </div>
            )}
          </div>
        )}
        
    </div>
  )
}
