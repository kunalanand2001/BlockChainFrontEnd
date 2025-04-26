import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import { useSelector } from 'react-redux';
import ProfileForm from './components/ProfileForm';
import CustomerRegister from './components/CustomerRegister';

export default function App() {
  const token = useSelector(state => state.auth.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/home" element={
          token ? <HomePage/> : <Navigate to="/" replace/>
        }/>
        <Route path="/customer/profile" element={<ProfileForm userType="customer" />} />
        <Route path="/seller/profile"   element={<ProfileForm userType="seller"   />} />
        <Route path="/CustomerRegister" element={<CustomerRegister/>}/>
      </Routes>
    </BrowserRouter>
  );
}
