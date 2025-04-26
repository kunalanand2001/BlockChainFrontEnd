import React, { useState } from 'react';

export default function CustomerRegister({ onSubmit }) {
  const [form, setForm] = useState({
    email: '',
    name: '',
    mobileNumber: '',
    address: '',
    city: '',
    gender: '',
    age: '',
    password: '',
    visibility: true
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Convert age from string to number
    onSubmit({ ...form, age: Number(form.age) });
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
      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input
        name="age" type="number"
        value={form.age}
        onChange={handleChange}
        placeholder="Age"
        required
      />
      <input
        name="password" type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <label>
        <input
          name="visibility" type="checkbox"
          checked={form.visibility}
          onChange={handleChange}
        /> Visible
      </label>
      <button type="submit">Register Customer</button>
    </form>
  );
}
