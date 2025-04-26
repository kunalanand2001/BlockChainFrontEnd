import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBalance } from '../features/auth/authThunks'
import './AddBalance.css';

const AddBalance = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const [amount, setAmount] = useState('');
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBalance({ role, token, amount }));
  };

  return (
    <div className="add-balance-container">
      <h2>Add Balance</h2>
      <form onSubmit={handleSubmit} className="add-balance-form">
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Adding...' : 'Add Balance'}
        </button>
      </form>
    </div>
  );
};

export default AddBalance;
