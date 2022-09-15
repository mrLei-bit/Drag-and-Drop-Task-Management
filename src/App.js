import '@/assets/styles/App.scss'
// 导入路由
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Task from '@/pages/Task/Task'
import Login from '@/pages/Login/Login'
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/task' element={<Task />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
