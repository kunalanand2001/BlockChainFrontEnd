// src/components/ProfileForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateProfile } from '../features/auth/authThunks';

export default function ProfileForm({ userType }) {
  const dispatch = useDispatch();
  const token = useSelector(s => s.auth.token);
  const user  = useSelector(s => s.auth.user) || {};
  const [editing, setEditing] = useState(false);

  // local form state
  const [form, setForm] = useState({
    name:    user.name || '',
    address: user.address || '',
    city:    user.city || '',
    // customer only:
    gender:  user.gender || '',
    age:     user.age || ''
  });

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(
      updateProfile({
        role: userType,
        token,
        updates: form    // { name, address, city, gender?, age? }
      })
    )
    .unwrap()
    .then(() => {
      setEditing(false);
      alert('Profile updated!');
    })
    .catch(err => {
      console.error(err);
      alert('Update failed');
    });
  };

  // which fields to show/edit
  const fields = [
    { key: 'name',    label: 'Full Name', editable: true },
    { key: 'address', label: 'Address',   editable: true },
    { key: 'city',    label: 'City',      editable: true },
    // only for customer:
    ...(userType === 'customer'
      ? [
          { key: 'gender', label: 'Gender', editable: true },
          { key: 'age',    label: 'Age',    editable: true, type: 'number' }
        ]
      : []),
    // always show but not editable
    { key: 'email',        label: 'Email',   editable: false },
    { key: 'mobileNumber', label: 'Phone',   editable: false },
    ...(userType === 'seller'
      ? [{ key: 'gstNumber', label: 'GST No.', editable: false }]
      : [])
  ];

  return (
    <div className="profile-card">
      <h2>{userType === 'seller' ? 'Seller' : 'Customer'} Profile</h2>

      {editing ? (
        <form onSubmit={onSubmit}>
          {fields.map(f => (
            <div className="form-group" key={f.key}>
              <label htmlFor={f.key}>{f.label}</label>
              <input
                id={f.key}
                name={f.key}
                type={f.type || 'text'}
                value={form[f.key] ?? ''}
                onChange={onChange}
                disabled={!f.editable}
                className={!f.editable ? 'readonly' : ''}
              />
            </div>
          ))}
          <div className="form-actions">
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
            <button type="submit" className="primary">
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          {fields.map(f => (
            <div className="detail-row" key={f.key}>
              <span className="label">{f.label}:</span>
              <span className="value">{user[f.key] ?? '-'}</span>
            </div>
          ))}
          <button onClick={() => setEditing(true)} className="primary">
            Edit Profile
          </button>
        </div>
      )}authSlice
    </div>
  );
}
