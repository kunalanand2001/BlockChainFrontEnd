import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function HomePage() {
  const user = useSelector(state => state.auth.user);
  const role = useSelector(state => state.auth.role);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Role: {role}</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
}
