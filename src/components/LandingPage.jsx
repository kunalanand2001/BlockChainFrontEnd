import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRole } from '../features/auth/authSlice';

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const choose = role => {
    dispatch(setRole(role));
    navigate('/auth');
  };

  return (
    <div>
      <h1>Choose Account Type</h1>
      <button onClick={() => choose('customer')}>Customer</button>
      <button onClick={() => choose('seller')}>Seller</button>
    </div>
  );
}
