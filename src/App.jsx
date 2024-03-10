import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Todos from './pages/Todos/Todos'
import Signup from './pages/Signup/Signup'
import Profile from './pages/Profile/Profile'
import Login from './pages/Login/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Users from './pages/Users/Users'
import User from './pages/User/User'
import DefaultLayout from './layout/DefaultLayout'


function App() {
  return (
    <>
    
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        
        <Route path='/' element={<ProtectedRoute><DefaultLayout/></ProtectedRoute>}>
          <Route path='' element={<Todos />}/>
          <Route path='profile' element={<Profile />}/>
          <Route path='settings' element={<Profile />}/>
          <Route path='users' element={<Users />}/>
          <Route path='users/:id' element={<User />}/>
        </Route>

      </Routes>
    </>
  )
}

export default App
