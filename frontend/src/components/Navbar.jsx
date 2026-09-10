import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Navbar.css'

function Navbar() {
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsAuth(!!localStorage.getItem('token'))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuth(false)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">GameTaskk</Link>
        <div className="nav-links">
          {!isAuth ? (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
