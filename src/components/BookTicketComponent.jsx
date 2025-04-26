// src/components/BookTicketComponent.jsx
import React, { useState, useEffect } from 'react'
import { Card, Form, ListGroup, Spinner, Alert, Row, Col, Button } from 'react-bootstrap'
import axios from '../api/axiosConfig'

export default function BookTicketComponent() {
  const [selectedType, setSelectedType] = useState('Bus')
  const [vehicles, setVehicles]         = useState([])
  const [filtered, setFiltered]         = useState([])
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState(null)

  // filter state
  const [date, setDate]                 = useState('')
  const [fromLocation, setFromLocation] = useState('')
  const [toLocation, setToLocation]     = useState('')

  // box style
  const boxStyle = {
    maxWidth: '720px',
    margin: '40px auto',
    padding: '32px',
    borderRadius: '12px',
    background: '#fff',
    border: '6px solid',
    borderImageSlice: 1,
    borderImageSource: 'linear-gradient(45deg, #007bff, #00c6ff)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
  }

  useEffect(() => {
    setLoading(true); setError(null)
    axios.get(`/vehicles/${selectedType.toLowerCase()}`)
      .then(resp => setVehicles(resp.data))
      .catch(() => setError(`Failed to load ${selectedType}s`))
      .finally(() => setLoading(false))
  }, [selectedType])

  // apply filters
  useEffect(() => {
    let list = vehicles
    if (date)           list = list.filter(v => v.date === date)
    if (fromLocation)   list = list.filter(v => v.from?.toLowerCase().includes(fromLocation.toLowerCase()))
    if (toLocation)     list = list.filter(v => v.to?.toLowerCase().includes(toLocation.toLowerCase()))
    setFiltered(list)
  }, [date, fromLocation, toLocation, vehicles])

  return (
    <Card style={boxStyle}>
      <Card.Body>

        {/* Vehicle Type Selector */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Vehicle Type</Form.Label>
          <Form.Select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="fs-5"
          >
            <option>Bus</option>
            <option>Train</option>
            <option>Flight</option>
          </Form.Select>
        </Form.Group>

        {/* Filters Row: From / To / Date */}
        <Form className="mb-4">
          <Row className="g-3">
            <Col md={4}>
              <Form.Group controlId="from" className="mb-0">
                <Form.Label className="fw-semibold">From:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter origin city/station"
                  value={fromLocation}
                  onChange={e => setFromLocation(e.target.value)}
                  size="lg"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="to" className="mb-0">
                <Form.Label className="fw-semibold">To:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter destination city/station"
                  value={toLocation}
                  onChange={e => setToLocation(e.target.value)}
                  size="lg"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="date" className="mb-0">
                <Form.Label className="fw-semibold">Date:</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  size="lg"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>

        {/* Loading/Error */}
        {loading && <div className="text-center my-4"><Spinner animation="border"/></div>}
        {error   && <Alert variant="danger" className="mt-4">{error}</Alert>}

        {/* Results List */}
        {!loading && !error && (
          <ListGroup className="mt-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {filtered.length === 0 
              ? <ListGroup.Item className="text-center fst-italic">
                  No {selectedType.toLowerCase()}s match your filters
                </ListGroup.Item>
              : filtered.map(v => (
                  <ListGroup.Item key={v.id} className="py-3 d-flex justify-content-between align-items-center">
                    <div>
                      <strong className="fs-5">{v.name || v.title || v.id}</strong><br/>
                      <small>From: {v.from||'N/A'} | To: {v.to||'N/A'} | Date: {v.date||'N/A'}</small>
                    </div>
                    <Button size="sm" variant="primary">Select</Button>
                  </ListGroup.Item>
                ))
            }
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  )
}
