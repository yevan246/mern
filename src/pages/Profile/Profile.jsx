import { useSelector } from "react-redux"
import { filesServerUrl } from "../../redux/api/authApi"

export default function Profile() {
    const user = useSelector((state) => state.user.user)
  return (
    <div>
        <h1>Profile</h1>
        <img src={`${filesServerUrl}/avatar/${user.avatar}`} alt="" /> <br/>

        Username: @{user?.username} <br/>
        Email: {user?.email} <br/>

        created at: {new Date(user?.createdAt).toLocaleDateString()}
        
    </div>
  )
}
