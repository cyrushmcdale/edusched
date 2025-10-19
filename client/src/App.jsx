import React, { useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function App() {
  const [role, setRole] = useState('student')
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!userId.trim() || !password.trim()) {
      setError('Please enter both User ID and Password')
      return
    }

    setLoading(true)
    try {
      const { data } = await axios.post(`${API_BASE}/api/auth/login`, { role, userId, password })
      setSuccess(`Welcome ${data.user.name} (${data.role})`) 
    } catch (err) {
      if (err.response?.data?.error) setError(err.response.data.error)
      else setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="brand">
        <img src="/logo.png" alt="UNP" className="logo" />
        <h1>EduSched</h1>
      </div>

      <div className="role-toggle">
        <button className={role==='student'?'active':''} onClick={()=>setRole('student')}>Student</button>
        <button className={role==='admin'?'active':''} onClick={()=>setRole('admin')}>Administrator</button>
      </div>

      <form className="card" onSubmit={handleSubmit}>
        <label>Enter your User ID:</label>
        <div className="input-row">
          <input
            inputMode="numeric"
            value={userId}
            onChange={(e)=>setUserId(e.target.value)}
            placeholder="12345"
          />
          <span className="icon">🆔</span>
        </div>

        <label>Password:</label>
        <div className="input-row">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <button type="button" className="icon" onClick={()=>setShowPassword(s=>!s)} aria-label="toggle password">{showPassword ? '🙈' : '👁️'}</button>
        </div>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <button type="submit" className="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <footer>
        <small>University of Northern Philippines • EduSched</small>
      </footer>
    </div>
  )
}
