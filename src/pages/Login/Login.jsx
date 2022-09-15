import './login.scss'
// 引入useNavigate函数
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  function login() {
    navigate('/task')
  }
  return (
    <div className='login' onClick={login}>
      Start App
    </div>
  )
}
