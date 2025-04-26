import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import { fetchProfile } from '../features/auth/authThunks'

export default function CustomerDashboard() {
  return (
    <div> CustomerDashboard </div>
  )
}
