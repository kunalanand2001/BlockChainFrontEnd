// src/components/CustomerTicketComponent.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Card, ListGroup, Spinner, Alert, Row, Col, Button, Form, InputGroup, Container, Badge } from 'react-bootstrap';
import { fetchBookings } from '../features/customer/customerDashboardThunks';

export default function CustomerTicketComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tickets = useSelector(
    state => state.customerDashboard.bookings
  )

  // box style
  const boxStyle = {
    maxWidth: '900px',
    margin: '30px auto',
    padding: '30px',
    borderRadius: '15px',
    background: '#f8f9fa',
    border: '1px solid #dee2e6',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
  };

  const filterStyle = {
    background: '#ffffff',
    border: '1px solid #ced4da',
    borderRadius: '5px',
    padding: '10px 15px'
  };


  return (
    <Container className="mt-5">
      <Card style={boxStyle}>
        <Card.Body>
          <Card.Title className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: '600', color: '#333' }}>
            My Tickets
          </Card.Title>

          {/* Refresh Button */}
          <div className="text-end mb-3">
            <Button 
              variant="outline-primary" 
              onClick={fetchBookings}
              disabled={loading}
            >
              {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Refresh'}
            </Button>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}

          {/* Results List */}
          {tickets?.length > 0 && (
            <TicketList tickets={tickets} />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

const TicketList = ({ tickets }) => (
  <ListGroup className="mt-3" style={{ maxHeight: '500px', overflowY: 'auto', border: '1px solid #ced4da' }}>
    {tickets.length === 0 ? (
      <ListGroup.Item className="text-center fst-italic" style={{ color: '#555' }}>
        No tickets found
      </ListGroup.Item>
    ) : (
      tickets.map((ticket, index) => (
        <TicketListItem key={ticket.ticketId || index} ticket={ticket} />
      ))
    )}
  </ListGroup>
);

const TicketListItem = ({ ticket }) => (
  <ListGroup.Item className="py-3">
    <Row>
      <Col md={8}>
        <h5 className="mb-1">
          {ticket.seatCount} • {ticket.pricePaid}
        </h5>
        <div className="text-muted mb-2">
          <small>
            {ticket.bookingTime} 
          </small>
        </div>
        <div>
          <Badge 
            bg={
              ticket.status === 'Active' ? 'success' :
              ticket.status === 'Completed' ? 'secondary' :
              ticket.status === 'Cancelled' ? 'danger' : 'info'
            }
          >
            {ticket.status || 'Booked'}
          </Badge>
          <span className="ms-2">Vehicle ID: {ticket.vehicleId}</span>
        </div>
      </Col>
      <Col md={4} className="text-end d-flex flex-column justify-content-between">
        <div>
          <h5 className="mb-0">₹{ticket.currentPrice}</h5>
          <small className="text-muted">Seat: {ticket.seatNumber}</small>
        </div>
        <div className="mt-2">
          <Button variant="outline-primary" size="sm">
            View Details
          </Button>
        </div>
      </Col>
    </Row>
  </ListGroup.Item>
);
