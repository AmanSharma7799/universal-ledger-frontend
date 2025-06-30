import React, { useEffect, useState } from "react";
import axios from "axios";
import sha256 from "crypto-js/sha256";
import { buildMerkleTree } from "../utils/merkleUtils";
import MerkleTreeView from "./MerkleTreeView";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [data, setData] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [verifyDetails, setVerifyDetails] = useState(null);
  const [merkleRoot, setMerkleRoot] = useState("");
  const [tree, setTree] = useState([]);

  const API_BASE = "https://universal-ledger-backend.onrender.com";

  const fetchEntries = async () => {
    const res = await axios.get(`${API_BASE}/api/ledger`);
    setEntries(res.data);
    buildTree(res.data);
  };

  const addEntry = async () => {
    if (!data) return;
    try {
      await axios.post(`${API_BASE}/api/ledger/add`, {
        data: JSON.parse(data),
      });
      setData("");
      fetchEntries();
      fetchMerkle();
    } catch (err) {
      alert("Invalid JSON format.");
    }
  };

  const verify = async () => {
    const res = await axios.get(`${API_BASE}/api/ledger/verify?verbose=true`);
    setIsValid(res.data.valid);
    if (!res.data.valid) setVerifyDetails(res.data);
    else setVerifyDetails(null);
  };

  const resetLedger = async () => {
    await axios.post(`${API_BASE}/api/ledger/reset`);
    fetchEntries();
    fetchMerkle();
    setIsValid(null);
    setVerifyDetails(null);
  };

  const fetchMerkle = async () => {
    const res = await axios.get(`${API_BASE}/api/ledger/merkle`);
    setMerkleRoot(res.data.merkleRoot);
  };

  const buildTree = (ledger) => {
    const hashes = ledger.map((e) => e.hash);
    setTree(buildMerkleTree(hashes));
  };

  useEffect(() => {
    fetchEntries();
    fetchMerkle();
  }, []);

  return (
    <div className="container">
      <h1>🔐 Universal Ledger Dashboard</h1>

      <div className="card section">
        <h2>Add New Ledger Entry</h2>
        <textarea
          rows="5"
          placeholder='{"event":"login","user":"abc"}'
          value={data}
          onChange={(e) => setData(e.target.value)}
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
            <strong>Status:</strong>{" "}
            <span className={isValid ? "valid" : "invalid"}>
              {isValid ? "Valid ✅" : "Tampered ❌"}
            </span>
            {!isValid && (
              <pre className="details">
                {JSON.stringify(verifyDetails, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>

      <div className="card section">
        <h2>🌲 Merkle Root</h2>
        <pre className="entries">{merkleRoot || "Loading..."}</pre>
      </div>

      <MerkleTreeView tree={tree} />

      <div className="card section">
        <h2>📜 Ledger Entries</h2>
        <pre className="entries">{JSON.stringify(entries, null, 2)}</pre>
      </div>
    </div>
  );
}
