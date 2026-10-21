import React, { useState } from "react";
import Submitted from "./Submitted";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [entries, setEntries] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Selectable list mode for edit/delete
  const [loadedRecords, setLoadedRecords] = useState(null);
  const [selectedAction, setSelectedAction] = useState(""); // "update" or "delete"

  const targetFile = "data.txt";

  // Helper: Read and parse JSON data from backend
  const fetchAllEntries = async () => {
    const res = await fetch(
      `http://localhost:3000/read?fname=${encodeURIComponent(targetFile)}`,
    );
    if (!res.ok) throw new Error("File not found or empty.");
    const data = await res.json();
    try {
      return JSON.parse(data.data);
    } catch {
      return [];
    }
  };

  // Helper: Overwrite entire file with updated JSON array
  const saveAllEntries = async (updatedList) => {
    const content = JSON.stringify(updatedList, null, 2);
    const res = await fetch(
      `http://localhost:3000/write?fname=${encodeURIComponent(targetFile)}&content=${encodeURIComponent(content)}`,
      { method: "POST" },
    );
    return res.ok;
  };

  // --- CREATE / APPEND RECORD ---
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!email || !password)
      return setError("Email and password are required.");
    setLoading(true);
    setError("");

    try {
      let currentList = [];
      try {
        currentList = await fetchAllEntries();
      } catch {
        currentList = [];
      }

      currentList.push({ email, password });
      await saveAllEntries(currentList);

      setStatusMessage("New record added successfully!");
      setEntries(null);
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to create record.");
    } finally {
      setLoading(false);
    }
  };

  // --- READ RECORDS ---
  const handleRead = async () => {
    setLoading(true);
    setError("");
    try {
      const records = await fetchAllEntries();
      setEntries(records);
      setStatusMessage("Fetched all records from data.txt");
      setIsSubmitted(true);
    } catch (err) {
      setError("No records found or file is empty.");
    } finally {
      setLoading(false);
    }
  };

  // --- FETCH BEFORE UPDATE OR DELETE ---
  const handlePrepareAction = async (actionType) => {
    setLoading(true);
    setError("");
    try {
      const records = await fetchAllEntries();
      if (records.length === 0) {
        setError("No records available to edit or delete.");
        return;
      }
      setLoadedRecords(records);
      setSelectedAction(actionType);
    } catch (err) {
      setError("Could not read file to perform action.");
    } finally {
      setLoading(false);
    }
  };

  // --- UPDATE SPECIFIC RECORD BY INDEX ---
  const handleExecuteUpdate = async (index) => {
    if (!email || !password) {
      setError("Fill in the new Email and Password fields above first.");
      return;
    }
    setLoading(true);
    const updated = [...loadedRecords];
    updated[index] = { email, password };

    await saveAllEntries(updated);
    setLoadedRecords(null);
    setSelectedAction("");
    setStatusMessage(`Entry #${index + 1} updated successfully!`);
    setIsSubmitted(true);
    setLoading(false);
  };

  // --- DELETE SPECIFIC RECORD BY INDEX ---
  const handleExecuteDelete = async (index) => {
    setLoading(true);
    const updated = loadedRecords.filter((_, i) => i !== index);

    await saveAllEntries(updated);
    setLoadedRecords(null);
    setSelectedAction("");
    setStatusMessage(`Entry #${index + 1} deleted successfully!`);
    setIsSubmitted(true);
    setLoading(false);
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setIsSubmitted(false);
    setEntries(null);
    setStatusMessage("");
    setError("");
    setLoadedRecords(null);
    setSelectedAction("");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      {isSubmitted ? (
        <Submitted
          message={statusMessage}
          entries={entries}
          onReset={handleReset}
        />
      ) : (
        <div className="card p-4 shadow-sm">
          <h2 className="mb-4 text-center">Crud with node</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleCreate}>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="passwordInput"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={loading}
            >
              {loading ? "Processing..." : "Create New Record"}
            </button>
          </form>

          {/* Action Row */}
          <div className="row g-2">
            <div className="col-4">
              <button
                className="btn btn-info text-white w-100"
                onClick={handleRead}
                disabled={loading}
              >
                Read All
              </button>
            </div>
            <div className="col-4">
              <button
                className="btn btn-warning text-white w-100"
                onClick={() => handlePrepareAction("update")}
                disabled={loading}
              >
                Update...
              </button>
            </div>
            <div className="col-4">
              <button
                className="btn btn-danger w-100"
                onClick={() => handlePrepareAction("delete")}
                disabled={loading}
              >
                Delete...
              </button>
            </div>
          </div>

          {/* Selectable Record List for Update or Delete */}
          {loadedRecords && (
            <div className="mt-4 p-3 border rounded bg-light">
              <h6 className="fw-bold">
                Select an entry to{" "}
                {selectedAction === "update"
                  ? "overwrite with current form inputs"
                  : "delete"}
                :
              </h6>
              <div className="list-group mt-2">
                {loadedRecords.map((item, idx) => (
                  <div
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>#{idx + 1}</strong>: {item.email}
                    </div>
                    {selectedAction === "update" ? (
                      <button
                        className="btn btn-sm btn-warning text-white"
                        onClick={() => handleExecuteUpdate(idx)}
                      >
                        Update This
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleExecuteDelete(idx)}
                      >
                        Delete This
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
