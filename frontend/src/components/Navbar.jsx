import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl">💰</span>
        <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          FinFlow
        </span>
      </Link>
      {token && (
        <button
          onClick={handleLogout}
          className="text-sm text-slate-400 hover:text-red-400 transition-colors duration-200"
        >
          Вийти →
        </button>
      )}
    </nav>
  )
}