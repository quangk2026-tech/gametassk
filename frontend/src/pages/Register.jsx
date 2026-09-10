import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { register } from '../api/auth'

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const ref = params.get('ref')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    try {
      const res = await register(form.username, form.email, form.password, ref)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>Create Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input type="password" name="confirm" placeholder="Confirm" value={form.confirm} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
