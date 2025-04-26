// src/pages/HomePage.jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import { fetchProfile } from '../features/auth/authThunks'

export default function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user  = useSelector(state => state.auth.user)
  const role  = useSelector(state => state.auth.role)
  const token = useSelector(state => state.auth.token)

  const handleViewProfile = () => {
    if (!token || !role) return

    // dispatch the fetchProfile thunk
    dispatch(fetchProfile({ role, token }))
      .unwrap()
      .then(() => {
        // once we have the full profile in state.auth.user, navigate:
        const path = role === 'seller'
          ? '/seller/profile'
          : '/customer/profile'
        navigate(path)
      })
      .catch(err => {
        console.error('Could not fetch profile:', err)
        alert('Failed to load profile. Please try again.')
      })
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome, {user?.name || 'User'}!</h1>
      <p>Role: {role}</p>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={handleViewProfile}
          style={{
            marginRight: 10,
            padding: '8px 16px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          View Profile
        </button>

        <button
          onClick={() => dispatch(logout())}
          style={{
            padding: '8px 16px',
            background: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
