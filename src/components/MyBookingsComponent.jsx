import React, { useState, useEffect } from 'react'
import { Card, Table, Spinner, Alert } from 'react-bootstrap'
import axios from '../api/axiosConfig'

export default function MyBookingsComponent() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  // gradient‐border box style
  const boxStyle = {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '24px',
    borderRadius: '12px',
    background: '#fff',
    border: '1px solid',
    borderImageSlice: 1,
    borderImageSource: 
      'linear-gradient(45deg, #007bff, #00c6ff)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)'
  }

  useEffect(() => {
    setLoading(true)
    setError(null)
    axios.get('/customer/bookings')
      .then(resp => setBookings(resp.data))
      .catch(() => setError('Failed to load bookings'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Card style={boxStyle}>
      <Card.Header style={{ fontWeight: '600', fontSize: '1.25rem' }}>
        My Bookings
      </Card.Header>
      <Card.Body>
        {loading && <div className="text-center"><Spinner animation="border" /></div>}
        {error   && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <Table striped bordered hover responsive>
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
  )
}
