import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Todos from './pages/Todos/Todos'
import Signup from './pages/Signup/Signup'
import Profile from './pages/Profile/Profile'
import Login from './pages/Login/Login'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return (
    <>
      <Header/>

      <Routes>
        <Route path='/' element={<Todos />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        
        <Route path='/' element={<ProtectedRoute/>}>
          <Route path='profile' element={<Profile />}/>
          <Route path='settings' element={<Profile />}/>
        </Route>

      </Routes>
    </>
  )
}

export default App
