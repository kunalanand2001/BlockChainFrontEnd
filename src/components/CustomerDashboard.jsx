import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBookings,
  fetchTransactions,
  bookTicket
} from '../features/customer/customerDashboardThunks';
import {
  Container, Row, Col,
  Button, Table, Form, Alert
} from 'react-bootstrap';
import BookTicketComponent from './BookTicketComponent';
import MyBookingsComponent from './MyBookingsComponent';
import TransactionsComponent from './TransactionsComponent';

export default function CustomerDashboard() {
  const dispatch = useDispatch();
  const { bookings, transactions, bookingResult, status, error } =
    useSelector(state => state.customerDashboard);

  const [activeTab, setActiveTab] = useState('bookings');
  const [ticketData, setTicketData] = useState({ tripId: '', seats: 1 });

  // Fetch data when tab changes
  useEffect(() => {
    if (activeTab === 'bookings') dispatch(fetchBookings());
    else if (activeTab === 'transactions') dispatch(fetchTransactions());
  }, [activeTab, dispatch]);

  const handleBookTicket = e => {
    e.preventDefault();
    dispatch(bookTicket(ticketData));
  };

  const buttonStyle = {
    backgroundColor: '#007bff',  // same blue as View Profile
    color: '#fff',               // white text
    fontSize: '1.25rem',
    padding: '12px 24px',
    margin: '10px',
    border: 'none',
    borderRadius: '8px',
    minWidth: '140px'
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4 justify-content-center">
        <Col className="d-flex flex-wrap justify-content-center">
          <Button
            style={buttonStyle}
            onClick={() => setActiveTab('bookings')}
            active={activeTab === 'bookings'}
          >
            My Bookings
          </Button>
          <Button
            style={buttonStyle}
            onClick={() => setActiveTab('bookTicket')}
            active={activeTab === 'bookTicket'}
          >
            Book Ticket
          </Button>
          <Button
            style={buttonStyle}
            onClick={() => setActiveTab('transactions')}
            active={activeTab === 'transactions'}
          >
            Transactions
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          {status === 'loading' && <p>Loading…</p>}
          {error && <Alert variant="danger">{error}</Alert>}

          {activeTab === 'bookings' && (
            <MyBookingsComponent/>
          )}

          {activeTab === 'bookTicket' && (
            <BookTicketComponent />                    // ← render new box
          )}

          {activeTab === 'transactions' && (
            <TransactionsComponent/>
          )}
        </Col>
      </Row>
    </Container>
  );
}
