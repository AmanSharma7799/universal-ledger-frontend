import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function App() {
  const [entries, setEntries] = useState([])
  const [data, setData] = useState('')
  const [isValid, setIsValid] = useState(null)
  const [verifyDetails, setVerifyDetails] = useState(null)

  const fetchEntries = async () => {
    const res = await axios.get('/api/ledger')
    setEntries(res.data)
  }

  const addEntry = async () => {
    if (!data) return
    try {
      await axios.post('/api/ledger/add', { data: JSON.parse(data) })
      setData('')
      fetchEntries()
    } catch (err) {
      alert('Invalid JSON format.')
    }
  }

  const verify = async () => {
    const res = await axios.get('/api/ledger/verify?verbose=true')
    setIsValid(res.data.valid)
    if (!res.data.valid) setVerifyDetails(res.data)
    else setVerifyDetails(null)
  }

  const resetLedger = async () => {
    await axios.post('/api/ledger/reset')
    fetchEntries()
    setIsValid(null)
    setVerifyDetails(null)
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  return (
    <div className="container">
      <h1>🔐 Universal Ledger Dashboard</h1>

      <div className="card section">
        <h2>Add New Ledger Entry</h2>
        <textarea
          rows="5"
          placeholder='{"event":"login","user":"abc"}'
          value={data}
          onChange={e => setData(e.target.value)}
        />
        <div className="btn-group">
          <button onClick={addEntry}>➕ Add Entry</button>
          <button onClick={resetLedger}>🗑 Reset Ledger</button>
        </div>
      </div>

      <div className="card section">
        <h2>Verify Ledger Integrity</h2>
        <div className="btn-group">
          <button onClick={verify}>✅ Verify Ledger</button>
        </div>
        {isValid !== null && (
          <div className="verify-status">
            <strong>Status:</strong>{' '}
            <span className={isValid ? 'valid' : 'invalid'}>
              {isValid ? 'Valid ✅' : 'Tampered ❌'}
            </span>
            {!isValid && (
              <pre className="details">{JSON.stringify(verifyDetails, null, 2)}</pre>
            )}
          </div>
        )}
      </div>

      <div className="card section">
        <h2>📜 Ledger Entries</h2>
        <pre className="entries">{JSON.stringify(entries, null, 2)}</pre>
      </div>
    </div>
  )
}
