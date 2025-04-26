import React, { useState, useEffect } from 'react'
import { Card, Table, Spinner, Alert } from 'react-bootstrap'
import axios from '../api/axiosConfig'

export default function TransactionsComponent() {
  const [txns, setTxns]     = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

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
    axios.get('/customer/transactions')
      .then(resp => setTxns(resp.data))
      .catch(() => setError('Failed to load transactions'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Card style={boxStyle}>
      <Card.Header style={{ fontWeight: '600', fontSize: '1.25rem' }}>
        Transactions
      </Card.Header>
      <Card.Body>
        {loading && <div className="text-center"><Spinner animation="border" /></div>}
        {error   && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Txn ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {txns.length === 0
                ? (
                  <tr>
                    <td colSpan="4" className="text-center fst-italic">
                      No transactions found
                    </td>
                  </tr>
                )
                : txns.map(t => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.amount}</td>
                    <td>{t.date}</td>
                    <td>{t.status}</td>
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
