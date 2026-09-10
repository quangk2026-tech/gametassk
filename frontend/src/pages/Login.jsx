import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login(form.email, form.password)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>Sign In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default Login
