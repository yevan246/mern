import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Todos from './pages/Todos/Todos'

function App() {

  return (
    <>
      <Header/>

      <Routes>
        <Route path='/' element={<Todos />}/>
      </Routes>
    </>
  )
}

export default App
