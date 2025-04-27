// src/components/BookTicketComponent.jsx
import React, { useState, useEffect } from 'react'
import { Card, Form, ListGroup, Spinner, Alert, Row, Col, Button, InputGroup, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import VehicleListItem from './VehicleListItem';

export default function BookTicketComponent() {
  const [selectedType, setSelectedType] = useState('Bus')
  const [filtered, setFiltered]         = useState([])
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState(null)
  const vehicles = useSelector(state=>state.customerDashboard.vehicles)
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
  }, [selectedType])

  // apply filters
  useEffect(() => {
    let list = vehicles
    if (fromLocation)   list = list.filter(v => v.source?.toLowerCase().includes(fromLocation.toLowerCase()))
    if (toLocation)     list = list.filter(v => v.destination?.toLowerCase().includes(toLocation.toLowerCase()))
    if(selectedType === "All") list = list
    if(selectedType && selectedType !== "All") list = list.filter(v => v.mode?.toLowerCase().includes(selectedType.toLowerCase()))
    
    setFiltered(list)
  }, [fromLocation, toLocation, vehicles, selectedType])

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
                        <option>All</option>
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
                    </Row>
                </Form>

                {/* Results List */}
                {<VehicleList selectedType={selectedType} filtered={filtered} />}
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
               <VehicleListItem vehicle={v}/>
            ))
        )}
    </ListGroup>
);

// [
//     {
//         "vehicleId": "vehicle-0f0c58e6-d11d-42cc-9a84-b8dfdf840bfc",
//         "sellerId": "ab@ab.com",
//         "source": "Lko",
//         "destination": "Knp",
//         "departureDate": "2025-11-11",
//         "departureTime": "11:11",
//         "mode": "flight",
//         "seatCapacity": 12,
//         "availableSeats": 12,
//         "basePrice": 310.0,
//         "currentPrice": 310.0,
//         "sellerRating": 3.75
//     },
// ]
