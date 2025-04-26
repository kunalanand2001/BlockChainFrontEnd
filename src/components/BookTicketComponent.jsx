// src/components/BookTicketComponent.jsx
import React, { useState, useEffect } from 'react'
import { Card, Form, ListGroup, Spinner, Alert, Row, Col, Button, InputGroup, Container } from 'react-bootstrap';
import axios from '../api/axiosConfig';

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
        maxWidth: '900px',
        margin: '30px auto',
        padding: '30px',
        borderRadius: '15px',
        background: '#f8f9fa', // Light gray background
        border: '1px solid #dee2e6', // Light gray border
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)' // Subtle shadow
    };

    const filterStyle = {
        background: '#ffffff', // White background
        border: '1px solid #ced4da', // Light gray border
        borderRadius: '5px',
        padding: '10px 15px'
    };

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
    <Container className="mt-5">
        <Card style={boxStyle}>
            <Card.Body>
                <Card.Title className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: '600', color: '#333' }}>
                    Book Your Ticket
                </Card.Title>

                {/* Vehicle Type Selector */}
                <Form.Group className="mb-4 d-flex align-items-center">
                    <Form.Label className="fw-bold me-3 mb-0" style={{ color: '#555' }}>Vehicle Type:</Form.Label>
                    <Form.Select
                        style={{ width: '150px', fontSize: '1rem', color: '#555' }}
                        value={selectedType}
                        onChange={e => setSelectedType(e.target.value)}
                        className="form-select-sm"
                    >
                        <option>Bus</option>
                        <option>Train</option>
                        <option>Flight</option>
                    </Form.Select>
                </Form.Group>

                {/* Filters Row: From / To / Date */}
                <Form className="mb-4">
                    <Row className="g-4">
                        <Col md={4}>
                            <InputGroup className="mb-0" style={filterStyle}>
                                <InputGroup.Text className="fw-bold" style={{ backgroundColor: 'transparent', border: 'none' }}>From</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter origin city/station"
                                    value={fromLocation}
                                    onChange={e => setFromLocation(e.target.value)}
                                    className="fs-6"
                                />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <InputGroup className="mb-0" style={filterStyle}>
                                <InputGroup.Text className="fw-bold" style={{ backgroundColor: 'transparent', border: 'none' }}>To</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter destination city/station"
                                    value={toLocation}
                                    onChange={e => setToLocation(e.target.value)}
                                    className="fs-6"
                                />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <InputGroup className="mb-0" style={filterStyle}>
                                <InputGroup.Text className="fw-bold" style={{ backgroundColor: 'transparent', border: 'none' }}>Date</InputGroup.Text>
                                <Form.Control
                                    type="date"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    className="fs-6"
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </Form>

                {/* Loading/Error */}
                {loading && <div className="text-center my-4"><Spinner animation="border" /></div>}
                {error && <Alert variant="danger" className="mt-4">{error}</Alert>}

                {/* Results List */}
                {!loading && !error && <VehicleList selectedType={selectedType} filtered={filtered} />}
            </Card.Body>
        </Card>
    </Container>
  )
}

const VehicleList = ({ selectedType, filtered }) => (
    <ListGroup className="mt-3" style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ced4da' }}>
        {filtered.length === 0 ? (
            <ListGroup.Item className="text-center fst-italic" style={{ color: '#555' }}>
                No {selectedType.toLowerCase()}s match your filters
            </ListGroup.Item>
        ) : (
            filtered.map(v => (
                <ListGroup.Item key={v.id} className="py-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
                    <div>
                        <strong className="fs-5" style={{ color: '#333' }}>{v.name || v.title || v.id}</strong><br />
                        <small style={{ color: '#555' }}>From: {v.from || 'N/A'} | To: {v.to || 'N/A'} | Date: {v.date || 'N/A'}</small>
                    </div>
                    <Button size="sm" variant="outline-primary">Select</Button>
                </ListGroup.Item>
            ))
        )}
    </ListGroup>
);
