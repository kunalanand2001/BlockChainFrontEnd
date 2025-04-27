import React, { useState } from 'react';
import "./AuthPage.css";

export default function CustomerLogin({ onSubmit }) {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="auth-page-container">
    <form onSubmit={handleSubmit} className="auth-form">
    <h2 className="auth-form-title">Customer Login</h2>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Customer Email"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit" className="auth-login-button">Login as Customer</button>
    </form>
    </div>
  );
}