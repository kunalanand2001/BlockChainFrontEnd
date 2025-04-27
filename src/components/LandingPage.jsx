import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRole } from '../features/auth/authSlice';
import './LandingPage.css';

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const choose = role => {
    dispatch(setRole(role));
    navigate('/auth');
  };

  return (
    <div className="landing-container">
      <div className="card customer" onClick={() => choose('customer')}>
        <h2>Customer</h2>
      </div>
      <div className="card seller" onClick={() => choose('seller')}>
        <h2>Seller</h2>
      </div>
    </div>
  );
}
