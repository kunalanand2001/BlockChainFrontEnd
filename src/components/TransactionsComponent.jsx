import React, { useState, useEffect } from 'react'
import { Card, Table, Spinner, Alert, Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function TransactionsComponent() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const transactions = useSelector(state=>state.customerDashboard.transactions)
  console.log(transactions);
  

  const cardStyle = {
    margin: '10px 0px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px auto',
    borderRadius: '10px',
    border: 'none',
    width: '1300px',
    height: '800px', // Set a fixed height (viewport height - margin)
    overflowY: 'auto', // Enable vertical scrolling
  };

  const tdStyle = {
    padding: '10px 8px',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '0.9rem',
  };
  const thStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 8px',
    textAlign: 'left',
    borderBottom: '2px solid #0056b3',
    fontSize: '1rem',
    position: 'sticky', // Make header stick to the top during scroll
    top: 0,
    zIndex: 1, // Ensure it's above the table body
  };

  const tableStyle = {
    marginTop: '0', // Remove top margin as it's within the card
    textAlign: 'center',
    marginBottom: '0', // Remove bottom margin
    width: '1000px',
    height: '700px'
  };

  const headerStyle = {
    backgroundColor: '#dee2e6',
    fontWeight: 'bold',
    borderBottom: '1px solid #dee2e6',
    padding: '0px',
    borderRadius: '10px 10px 0 0', // Apply border-radius to the top
    textAlign: 'center', 
    fontSize: 'large'
  };

  useEffect(() => {
    setLoading(true)
    setError(null)
  }, [])

  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000); // Unix timestamp is in seconds
    return date.toLocaleString(); // Converts to readable format
  };


  return (
    <Card style={cardStyle}>
      <Card.Body className="p-3" style={{ padding: 0 }}> {/* Remove padding from Card.Body to control table spacing */}
        {loading && (
          <div className="text-center py-3">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {error && (
          <Alert variant="danger" className="mb-3">{error}</Alert>
        )}
        <Card.Header style={headerStyle}>
        <h5 className="m-0">Transaction History</h5>
      </Card.Header>
        <Table striped bordered hover responsive style={tableStyle} className="mb-0"> {/* Remove margin-bottom from Table */}
          <thead>
            <tr>
              <th style={thStyle}>Txn ID</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Date & Time</th>
              <th style={thStyle}>Destination</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center fst-italic" style={tdStyle}>
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions && transactions.map((t) => (
                <tr key={t.txnId}>
                  <td style={tdStyle}>{t.txnId}</td>
                  <td style={tdStyle}>${t.amount ? t.amount.toFixed(2) : 'N/A'}</td>
                  <td style={tdStyle}>{t.timestamp ? formatDate(t.timestamp) : 'N/A'}</td>
                  <td style={tdStyle}>{t.destination || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

// "txnId": "TXN-d8515765-31dd-4757-880e-47edfe24f0d0",
// "source": "app",
// "destination": "k3@k3.com",
// "amount": 100.0,
// "timestamp": "1745749839"