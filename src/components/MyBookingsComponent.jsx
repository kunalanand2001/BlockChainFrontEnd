import React, { useState, useEffect } from 'react'
import { Card, Table, Spinner, Alert, Container, Row, Col } from 'react-bootstrap'
import './ProfileForm.css' // Import the CSS file
import axios from '../api/axiosConfig'

export default function MyBookingsComponent() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    axios.get('/customer/bookings')
      .then(resp => setBookings(resp.data))
      .catch(() => setError('Failed to load bookings'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Container className="profile-container">
      <Row>
        <Col>
          <Card className="profile-card">
            <Card.Header className="profile-card-header">
              My Bookings
            </Card.Header>
            <Card.Body>
              {loading && <div className="text-center"><Spinner animation="border" /></div>}
              {error   && <Alert variant="danger">{error}</Alert>}

              {!loading && !error && (
                <Table striped bordered hover responsive className="custom-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Trip Name</th>
                      <th>Seats</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 
                      ? (
                        <tr>
                          <td colSpan="4" className="text-center fst-italic">
                            No bookings found
                          </td>
                        </tr>
                      )
                      : bookings.map(b => (
                        <tr key={b.id}>
                          <td>{b.id}</td>
                          <td>{b.tripName}</td>
                          <td>{b.seats}</td>
                          <td>{b.date}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

