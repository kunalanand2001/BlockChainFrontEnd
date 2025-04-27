import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import { fetchProfile, getBalance } from '../features/auth/authThunks'
import SellerDashboard from './SellerDashboard'
import CustomerDashboard from './CustomerDashboard'

function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user  = useSelector(state => state.auth.user)
  const role  = useSelector(state => state.auth.role)
  const token = useSelector(state => state.auth.token)
  const balance = useSelector(state => state.auth.balance)
  
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

  useEffect(() => {
    dispatch(getBalance({ role, token }))
  }, [])

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

  const linkButtonStyle = {
    ...buttonStyle,
    textDecoration: 'none'
  }

  const dashboardContentStyle = {
    marginTop: '20px',
  };

  const buttonGroupStyle = {
    display: 'flex',
    alignItems: 'center'
  }

  const balanceContainerStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginRight: '10px',
  };


  return (
    <div style={containerStyle}>
      <div style={headerRowStyle}>
        <div style={welcomeTextStyle}>
          <h1>Welcome, {user?.name || 'Guest'}!</h1>
          <p>Role: {role || 'None'}</p>
        </div>
        <div>
          {(
            <div style={balanceContainerStyle}>
              <span>💰</span>
              <span>Balance: {balance}</span>
            </div>
          )}
        </div>
        <div style={buttonGroupStyle}>
          <button onClick={handleViewProfile} style={buttonStyle}>
            View Profile
          </button>
          {(
            <Link to="/addBalance" style={linkButtonStyle}>Add Balance</Link>
          )}

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

export default HomePage;