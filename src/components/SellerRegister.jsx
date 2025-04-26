import React, { useState } from 'react';

export default function SellerRegister({ onSubmit }) {
  const [form, setForm] = useState({
    email: '',
    mobileNumber: '',
    gstNumber: '',
    address: '',
    city: '',
    password: '',
    name: ''
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
    <form onSubmit={handleSubmit}>
      <input
        name="email" type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
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
        name="password" type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <button type="submit">Register Seller</button>
    </form>
  );
}
