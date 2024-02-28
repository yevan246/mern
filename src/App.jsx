import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Todos from './pages/Todos/Todos'
import Signup from './pages/Signup/Signup'
import Profile from './pages/Profile/Profile'
import Login from './pages/Login/Login'
import { useGetMeQuery } from './redux/api/userApi'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setUser } from './redux/features/userSlice'


function App() {
  const {data, isLoading, isSuccess} = useGetMeQuery()
  const dispatch = useDispatch()
  console.log(data, isSuccess, isLoading);

    if(isSuccess) {
      dispatch(setUser(data))
    }


  if(!data) {
    return 'Loading'
  }

  return (
    <>
      <Header/>

      <Routes>
        <Route path='/' element={<Todos />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
    </>
  )
}

export default App
