import API from './client'

export const register = (username, email, password, referralCode) => 
  API.post('/api/auth/register', { username, email, password, referralCode })

export const login = (email, password) => 
  API.post('/api/auth/login', { email, password })
