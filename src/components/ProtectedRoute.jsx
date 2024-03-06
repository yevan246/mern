import { useDispatch } from "react-redux"
import { useGetMeQuery } from "../redux/api/userApi"
import { Navigate, Outlet } from "react-router-dom"
import { useEffect } from "react"
import { setUser } from "../redux/features/userSlice"

export default function ProtectedRoute() {
    const token = localStorage.getItem('token')
    const {data, isLoading, isSuccess} = useGetMeQuery(null, {
        skip: token === null
    })

    // console.log(isLoading, isFetching);

    const dispatch = useDispatch()

    useEffect(() => {
        if(data && isSuccess) {
            dispatch(setUser(data))
        }
    }, [isSuccess, data, dispatch])

    if(isLoading) {
        return  'Loading...'
    }

    if(isSuccess) {
        return <Outlet />
    }


  return <Navigate to='/login' />
}
