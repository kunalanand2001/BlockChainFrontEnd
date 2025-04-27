import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import ProfileForm from './components/ProfileForm';
import AddVehiclePage from './components/AddVehicle';
import CustomerRegister from './components/CustomerRegister';
import AddBalance from './components/AddBalance';
import BookingModal from './components/BookingModal';
import ReactModal from 'react-modal';
import { closeModal } from './features/customer/customerDashboardSlice';
ReactModal.setAppElement('#root');
export default function App() {
  const token = useSelector(state => state.auth.token);
  const { isModalOpen, modalVehicle } = useSelector(state => state.customerDashboard);
  console.log("Here2", isModalOpen, modalVehicle)
  const dispatch = useDispatch()
  const clModal = () => {
    dispatch(closeModal())
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/home" element={
          token ? <HomePage/> : <Navigate to="/" replace/>
        }/>
        <Route path="/customer/profile" element={<ProfileForm userType="customer" />} />
        <Route path="/seller/profile"   element={<ProfileForm userType="seller"   />} />
        <Route path="/seller/vehicle/add" element={
           <AddVehiclePage />
        }/>
        <Route path="/CustomerRegister" element={<CustomerRegister/>}/>
         <Route path="/addBalance" element={
           <AddBalance />
        }/>
      </Routes>
      {isModalOpen && (
        <BookingModal
          isModalOpen={isModalOpen}
          vehicle={modalVehicle}
          closeModal={clModal}
        />
      )}
    </BrowserRouter>
  );
}
