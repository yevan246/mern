import { useParams } from "react-router-dom"
import { useGetUserByIdQuery } from "../../redux/api/userApi"
import { filesServerUrl } from "../../redux/api/authApi";

export default function User() {
    const {id} = useParams()

    const {data: user, isLoading} = useGetUserByIdQuery(id)
    console.log(user);

    if(isLoading) {
        return 'Loading...'
    }
  return (
    <div>
        <img src={`${filesServerUrl}/avatar/${user.avatar}`} alt=''/>
        <b>{user.username}</b>
    </div>
  )
}
