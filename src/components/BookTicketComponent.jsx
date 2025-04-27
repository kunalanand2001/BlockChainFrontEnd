// src/components/BookTicketComponent.jsx
import React, { useState, useEffect } from 'react'
import { Card, Form, ListGroup, Spinner, Alert, Row, Col, Button, InputGroup, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import VehicleListItem from './VehicleListItem';


export default function BookTicketComponent() {
  const [selectedType, setSelectedType] = useState('All')
  const [filtered, setFiltered]         = useState([])
  const [minSeats, setMinSeats] = useState(1)
  const vehicles = useSelector(state=>state.customerDashboard.vehicles)
  // filter state
  const [fromLocation, setFromLocation] = useState('')
  const [toLocation, setToLocation]     = useState('')
  const [date, setDate] = useState('');
  const [sortOrder, setSortOrder] = useState('reset');



    // box style
    const boxStyle = {
        width: '1300px',
        height: '1000px',
        margin: '30px auto',
        
        borderRadius: '15px',
        background: '#f8f9fa', // Light gray background
        border: '1px solid #dee2e6', // Light gray border
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)' // Subtle shadow
    };

    const innerboxStyle = {
        marginTop: '250px',
        width: '1000px',
        height: '800px',
        marginTop: '20px'
    }

    const filterStyle = {
        background: '#ffffff', // White background
        border: '1px solid #ced4da', // Light gray border
        borderRadius: '5px',
        padding: '10px 15px'
    };

  // apply filters
  useEffect(() => {
    let list = vehicles
    console.log(vehicles.length);
    
    if (fromLocation)   list = list.filter(v => v.source?.toLowerCase().includes(fromLocation.toLowerCase()))
    
        if (toLocation)     list = list.filter(v => v.destination?.toLowerCase().includes(toLocation.toLowerCase()))
    
        if (minSeats > 0) 
        list = list.filter(v => v.availableSeats >= minSeats)
    
    if(selectedType === "All") list = list
    if(selectedType && selectedType !== "All") list = list.filter(v => v.mode?.toLowerCase().includes(selectedType.toLowerCase()));
    
    if (date) list = list.filter(v => v.departureDate === date);

    if (sortOrder === 'lowToHigh') {
        list = list.slice().sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (sortOrder === 'highToLow') {
        list = list.slice().sort((a, b) => b.currentPrice - a.currentPrice);
    }

    setFiltered(list)
  }, [fromLocation, toLocation, vehicles, selectedType, minSeats, date, sortOrder])

  return (
    <Container className="mt-5">

        <Card style={boxStyle}>
            <Card.Body style={innerboxStyle}> 
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

                
          <Form.Group controlId="seatFilter">
            <Form.Label>
              Min. Seats: <strong>{minSeats}</strong>
            </Form.Label>
            <Form.Range
              min={1}
              max={70}
              value={minSeats}
              onChange={e => setMinSeats(Number(e.target.value))}
            />
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
                <Form.Group className="mb-4 d-flex align-items-center">
                <Form.Label className="fw-bold me-3 mb-0" style={{ color: '#555' }}>Sort Price:</Form.Label>
                    <Form.Select
                        style={{ width: '150px', fontSize: '1rem', color: '#555' }}
                        value={sortOrder}
                        onChange={e => setSortOrder(e.target.value)}
                        className="form-select-sm"
                    >
                        <option value="reset">Reset</option>
                        <option value="lowToHigh">Low to High</option>
                        <option value="highToLow">High to Low</option>
                    </Form.Select>
                </Form.Group>

                {/* Results List */}
                {<VehicleList selectedType={selectedType} filtered={filtered} />}
            </Card.Body>
        </Card>
    </Container>
  )
}

const VehicleList = ({ selectedType, filtered }) => (
    <ListGroup  className="mt-3" style={{ maxHeight: '500px', overflowY: 'auto', border: '1px solid #ced4da' }}>
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

// {
//     "vehicleId": "vehicle-f1935784-2df1-4b9c-8f25-72ec4d676017",
//     "sellerId": "seller0@gmail.com",
//     "source": "kashmir",
//     "destination": "nagpur",
//     "departureDate": "2025-09-27",
//     "departureTime": "13:50:00",
//     "mode": "bus",
//     "seatCapacity": 1000,
//     "availableSeats": 1000,
//     "basePrice": 300.0,
//     "dayOfMonth": 27,
//     "dayOfWeek": "SATURDAY",
//     "dayOfYear": 270
// }