import { useEffect } from "react"
import { useUserLoginMutation } from "../../redux/api/authApi"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { setUser } from "../../redux/features/userSlice"
import {useForm} from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    emailOrUsername: yup.string().min(6, "Username must be at least 6 characters").required(),
    password: yup.string().min(8, "Password must be at least 8 characters").required(),
});

export default function Login() {
    const [login, {isLoading, isSuccess}] = useUserLoginMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        if(isSuccess) {
            navigate('/profile')
        }
    }, [isLoading, isSuccess, navigate])

    const handleSubmit2 = async (values) => {
        try {
            const response = await login(values).unwrap()
            dispatch(setUser(response))            
        } catch (e) {
            toast.error(e.data.message, {
                draggable: true
            })
        }
    }

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gray-200 text-gray-700">
        <form  className="flex flex-col bg-white rounded shadow-lg p-12 pt-5 mt-12" onSubmit={handleSubmit(handleSubmit2)}> 
            <div className="text-3xl mb-8 font-bold text-center">Login</div>

            <label className="font-semibold text-xs">Username or Email</label>
            <input 
                className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" 
                type="text"
                {...register('emailOrUsername')} 
                />
            {errors.emailOrUsername && (<div className="text-xs mt-1 text-red-600">{errors.emailOrUsername.message}</div>)}

            <label className="font-semibold text-xs mt-3">Password</label>
            <input 
                className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" 
                type="password" 
                {...register('password')} />
            {errors.password && (<div className="text-xs mt-1 text-red-600">{errors.password.message}</div>)}

            <button 
                className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700" 
                disabled={isLoading}>Log In</button>
        </form>
    </div>
  )
}
