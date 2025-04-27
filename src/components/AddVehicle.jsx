// src/pages/AddVehiclePage.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVehicle } from '../features/seller/sellerThunks';
import { useNavigate } from 'react-router-dom';
import './AddVehicle.css';

export default function AddVehiclePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sellerId = useSelector(s => s.auth.user?.id);
  const token    = useSelector(s => s.auth.token);

  const [form, setForm] = useState({
    source: '',
    destination: '',
    departureDate: '',
    departureTime: '',
    mode: '',
    seatCapacity: '',
    basePrice: ''
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // build payload
    const [hour, minute] = form.departureTime.split(':').map(Number);
    const payload = {
      sellerId,
      source:       form.source,
      destination:  form.destination,
      departureDate: form.departureDate,
      departureTime: `${hour}:${minute}`,
      mode:         form.mode,
      seatCapacity: Number(form.seatCapacity),
      basePrice:    Number(form.basePrice)
    };

    try {
      await dispatch(addVehicle(payload)).unwrap();
      alert('Vehicle added successfully!');
      navigate('/home'); // or wherever
    } catch (err) {
      console.error(err);
      setError(err || 'Failed to add vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-vehicle-container">
      <div className="card">
        <h2>Add New Vehicle</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Source</label>
              <input
                type="text"
                name="source"
                value={form.source}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Destination</label>
              <input
                type="text"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Departure Date</label>
              <input
                type="date"
                name="departureDate"
                value={form.departureDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Departure Time</label>
              <input
                type="time"
                name="departureTime"
                value={form.departureTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mode</label>
              <select
                name="mode"
                value={form.mode}
                onChange={handleChange}
                required
              >
                <option value="">Select mode</option>
                <option value="bus">Bus</option>
                <option value="train">Train</option>
                <option value="flight">Flight</option>
                <option value="car">Car</option>
              </select>
            </div>
            <div className="form-group">
              <label>Seat Capacity</label>
              <input
                type="number"
                name="seatCapacity"
                min="1"
                value={form.seatCapacity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Base Price (₹)</label>
              <input
                type="number"
                name="basePrice"
                min="0"
                value={form.basePrice}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="primary"
              disabled={loading}
            >
              {loading ? 'Adding…' : 'Add Vehicle'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
