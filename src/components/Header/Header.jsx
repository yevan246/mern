import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex items-center lg:order-2">
        <NavLink className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50" to='/'>To Do List</NavLink>
        <NavLink className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50" to='/signup'>Sign Up</NavLink>
        <NavLink className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50" to='/login'>Log In</NavLink>
    </div>
  )
}
