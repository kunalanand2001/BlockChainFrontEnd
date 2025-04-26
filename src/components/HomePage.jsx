// src/pages/HomePage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import { fetchProfile } from '../features/auth/authThunks'
import SellerDashboard from './SellerDashboard'
import CustomerDashboard from './CustomerDashboard'

function HomePage() {
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

  // Style objects for inline styling
  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  };

  const headerRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const welcomeTextStyle = {
    color: '#333',
  };

  const buttonStyle = {
    marginRight: '10px',
    padding: '10px 20px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    background: '#dc3545',
  };

  const dashboardContentStyle = {
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={headerRowStyle}>
        <div style={welcomeTextStyle}>
          <h1>Welcome, {user?.name || 'Guest'}!</h1>
          <p>Role: {role || 'None'}</p>
        </div>
        <div>
          <button onClick={handleViewProfile} style={buttonStyle}>View Profile</button>
          <button onClick={() => dispatch(logout())} style={logoutButtonStyle}>Logout</button>
        </div>
      </div>

      <div style={dashboardContentStyle}>
        {role === 'seller' && <SellerDashboard />}
        {role === 'customer' && <CustomerDashboard />}
      </div>
    </div>
  )
}

export default HomePage;
