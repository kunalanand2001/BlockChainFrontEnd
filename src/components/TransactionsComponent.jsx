import React, { useState, useEffect } from 'react'
import { Card, Table, Spinner, Alert, Container, Row, Col } from 'react-bootstrap'
import axios from '../api/axiosConfig'

export default function TransactionsComponent() {
  const [txns, setTxns]     = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const cardStyle = {
    margin: '20px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    border: 'none',
  };

  const tableStyle = {
    marginTop: '20px',
    textAlign: 'center'
  };

  const headerStyle = {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    borderBottom: '1px solid #dee2e6',
    padding: '10px'
  }

  useEffect(() => {
    setLoading(true)
    setError(null)
    axios.get('/customer/transactions')
      .then(resp => setTxns(resp.data))
      .catch(() => setError('Failed to load transactions'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Container>
        <Row className="justify-content-center">
            <Col md={10} lg={8}>
                <Card style={cardStyle}>
                    <Card.Header style={headerStyle}>
                        <h3 className="m-0">Transactions</h3>
                    </Card.Header>
                    <Card.Body>
                        {loading && <div className="text-center"><Spinner animation="border" variant="primary" /></div>}
                        {error && <Alert variant="danger">{error}</Alert>}

                        {!loading && !error && (
                            <Table striped bordered hover responsive style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th>Txn ID</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {txns.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center fst-italic">
                                                No transactions found
                                            </td>
                                        </tr>
                                    ) : (
                                        txns.map(t => (
                                            <tr key={t.id}>
                                                <td>{t.id}</td>
                                                <td>{t.amount}</td>
                                                <td>{t.date}</td>
                                                <td>{t.status}</td>
                                            </tr>
                                        ))
                                    )}
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
