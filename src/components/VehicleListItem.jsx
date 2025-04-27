// src/components/VehicleListItem.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeVehicle } from '../features/seller/sellerThunks';
import './VehicleListItem.css';

export default function VehicleListItem({ vehicle }) {
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);
  const role = useSelector(state=>state.auth.role);

  const handleRemove = async () => {
    if (!window.confirm('Remove this vehicle?')) return;
    setDeleting(true);
    try {
      await dispatch(removeVehicle({ vehicleId: vehicle.id })).unwrap();
      // optionally show a toast
    } catch (err) {
      console.error(err);
      alert('Failed to remove vehicle.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="vehicle-card">
      <div className="vehicle-info">
        <div>
          <div className="label">Vehicle ID</div>
          <div className="value">{vehicle.vehicleId}</div>
        </div>
        <div>
          <div className="label">Available Seats</div>
          <div className="value">{vehicle.availableSeats}</div>
        </div>
        <div>
          <div className="label">Seat Capacity</div>
          <div className="value">{vehicle.seatCapacity}</div>
        </div>
        <div>
          <div className="label">Base Price</div>
          <div className="value">₹ {vehicle.basePrice}</div>
        </div>
      </div>
      {role === "seller" && (<button
        className="remove-button"
        onClick={handleRemove}
        disabled={deleting}
      >
        {deleting ? 'Removing…' : 'Remove'}
      </button>)}
    </div>
  );
}
