import React from "react";

function Submitted({ message, entries, onReset }) {
  return (
    <div className="card p-4 shadow-sm text-center">
      <div className="text-success mb-3" style={{ fontSize: "3rem" }}>
        ✓
      </div>
      <h3 className="mb-2">Operation Complete</h3>
      <p className="text-muted">{message}</p>

      {entries && entries.length > 0 ? (
        <div className="alert alert-light border text-start mt-3">
          <small className="text-muted d-block fw-bold mb-2">
            All Current Entries in data.txt:
          </small>
          <ul className="list-group">
            {entries.map((item, index) => (
              <li key={index} className="list-group-item">
                <strong>Entry #{index + 1}:</strong> {item.email}
              </li>
            ))}
          </ul>
        </div>
      ) : entries && entries.length === 0 ? (
        <div className="alert alert-warning mt-3">
          No records found in data.txt.
        </div>
      ) : null}

      <button className="btn btn-outline-primary w-100 mt-3" onClick={onReset}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Submitted;
