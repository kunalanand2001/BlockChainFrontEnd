import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerBook } from '../features/customer/customerDashboardThunks';
import './BookingModal.css';
import ReactModal from 'react-modal';



function BookingModal({ isModalOpen, closeModal, vehicle }) {
  const dispatch = useDispatch();
  const [seatCount, setSeatCount] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const token = useSelector(state => state.auth.token);
      
  const incrementSeatCount = () => {
    if (seatCount < vehicle.availableSeats) {
      setSeatCount(seatCount + 1);
    }
  };

  const decrementSeatCount = () => {
    if (seatCount > 1) {
      setSeatCount(seatCount - 1);
    }
  };

  const handleBook = async () => {
    setBookingLoading(true);
    try {
      await dispatch(customerBook({ token, vehicleNumber: vehicle.vehicleId, vehicleId: vehicle.id, seatCount })).unwrap();
      setBookingSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Unable to book");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleClose = () => {
    closeModal();
    setSeatCount(1);
    setBookingSuccess(false);
  };
  console.log(isModalOpen)
  return (
    <ReactModal isOpen={isModalOpen} onRequestClose={handleClose} className="booking-modal-content" overlayClassName="booking-modal-overlay">
      <div className='booking-modal-header'>
        <h2>Vehicle Details</h2>
        <button className='close-button' onClick={handleClose}>x</button>
      </div>
      <div className="booking-modal-body">
        <p>Vehicle ID: {vehicle.vehicleId}</p>
        <p>Available Seats: {vehicle.availableSeats}</p>
        <p>Seat Capacity: {vehicle.seatCapacity}</p>
        <p>Base Price: ₹ {vehicle.basePrice}</p>
        {bookingSuccess ? <div>Booking Successful</div> : <div className="seat-counter">
          <button className="seat-button" onClick={decrementSeatCount} disabled={bookingLoading}>-</button>
          <span>{seatCount}</span>
          <button className="seat-button" onClick={incrementSeatCount} disabled={bookingLoading}>+</button>
        </div>}
      </div>

      {!bookingSuccess && (
        <div className='booking-modal-footer'>
          <button
            className="book-button"
            onClick={handleBook}
            disabled={bookingLoading || vehicle.availableSeats === 0}
          >
            {bookingLoading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      )}
    </ReactModal>
  );
}

export default BookingModal;
