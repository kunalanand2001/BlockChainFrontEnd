import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  registerCustomer, registerSeller,
  loginCustomer,    loginSeller
} from '../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';

import CustomerRegister from './CustomerRegister';
import SellerRegister   from './SellerRegister';
import CustomerLogin    from './CustomerLogin';
import SellerLogin      from './SellerLogin';

export default function AuthPage() {
  const role     = useSelector(s => s.auth.role);       // 'customer' or 'seller'
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = data => {
    const thunk = isLogin
      ? (role === 'customer' ? loginCustomer  : loginSeller)
      : (role === 'customer' ? registerCustomer : registerSeller);

    dispatch(thunk(data))
      .unwrap()
      .then(() => navigate('/home'))
      .catch(console.error);
  };

  return (
    <div>
      <h2>
        {role.charAt(0).toUpperCase() + role.slice(1)}{' '}
        {isLogin ? 'Login' : 'Register'}
      </h2>

      {isLogin
        ? (role === 'customer'
            ? <CustomerLogin onSubmit={handleAuth}/>
            : <SellerLogin   onSubmit={handleAuth}/>)
        : (role === 'customer'
            ? <CustomerRegister onSubmit={handleAuth}/>
            : <SellerRegister   onSubmit={handleAuth}/>)
      }

      <p
        style={{ cursor: 'pointer', color: 'blue' }}
        onClick={() => setIsLogin(l => !l)}
      >
        {isLogin
          ? 'Need an account? Register'
          : 'Have an account? Login'}
      </p>
    </div>
  );
}
