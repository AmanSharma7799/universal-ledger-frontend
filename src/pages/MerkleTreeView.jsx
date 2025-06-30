import React from "react";

export default function MerkleTreeView({ tree }) {
  return (
    <div className="card section">
      <h2>🧬 Full Merkle Tree</h2>
      {tree.map((level, i) => (
        <div key={i} className="merkle-level">
          <h4>Level {tree.length - i - 1}</h4>
          <div className="merkle-row">
            {level.map((hash, j) => (
              <div key={j} className="merkle-node">
                {hash.slice(0, 10)}...
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
