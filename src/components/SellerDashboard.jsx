// src/pages/SellerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles, fetchTransactions } from '../features/seller/sellerThunks';
import { useNavigate } from 'react-router-dom';
import './SellerDashboard.css';
import VehicleListItem from './VehicleListItem';

export default function SellerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('vehicles');

  const vehicles     = useSelector(s => s.seller.vehicles);
  const vehStatus    = useSelector(s => s.seller.statusVehicles);
  const transactions = useSelector(s => s.seller.transactions);
  const txnStatus    = useSelector(s => s.seller.statusTransactions);

  // fetch on tab change
  useEffect(() => {
    if (activeTab === 'vehicles') {
      dispatch(fetchVehicles());
    } else {
      dispatch(fetchTransactions());
    }
  }, [activeTab, dispatch]);

  return (
    <div className="dashboard-container">
      {/* Tab selector */}
      <div className="tab-row">
        <div
          className={activeTab === 'vehicles' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('vehicles')}
        >
          My Vehicles
        </div>
        <div
          className={activeTab === 'transactions' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </div>
      </div>

      {/* Content */}
      {activeTab === 'vehicles' ? (
        <div className="content">
          <div className="actions">
            <h2>Vehicles ( {vehicles?.length} )</h2>
            <button
              className="button"
              onClick={() => navigate('/seller/vehicle/add')}
            >
              + Add Vehicle
            </button>
          </div>

          {vehStatus === 'loading' && <p>Loading vehicles…</p>}
          {vehicles && (<div className="scrollable-list">
            {vehicles.map(v => <VehicleListItem  vehicle={v} />)}
          </div>)}
        </div>
      ) : (
        <div className="content">
          <div className="actions">
            <h2>Transactions ( {transactions.length} )</h2>
          </div>

          {txnStatus === 'loading' && <p>Loading transactions…</p>}
          <div className="scrollable-list">
            {transactions.map(tx => (
              <div className="list-item" key={tx.id}>
                <p><strong>#{tx.id}</strong> – {tx.date}</p>
                <p>Amount: ${tx.amount} | Vehicle: {tx.vehicleId}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
