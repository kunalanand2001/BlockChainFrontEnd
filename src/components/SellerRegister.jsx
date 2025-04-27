import React, { useState } from "react";

export default function SellerRegister({ onSubmit }) {
  const [form, setForm] = useState({
    email: "",
    mobileNumber: "",
    gstNumber: "",
    address: "",
    city: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="auth-page-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-form-title">Seller Register</h2>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="mobileNumber"
          value={form.mobileNumber}
          onChange={handleChange}
          placeholder="Mobile Number"
          required
        />
        <input
          name="gstNumber"
          value={form.gstNumber}
          onChange={handleChange}
          placeholder="GST Number"
          required
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
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

        <button type="submit" className="auth-login-button">
          Register Seller
        </button>
      </form>
    </div>
  );
}
