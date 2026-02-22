import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./MGP_Circuits-BE-Page.css";

import mlbbBanner from "../../assets/images/mlbb_teams/mlbb_banner.png";

const MGPCircuitsBE = ({ theme }) => {
  const [circuits, setCircuits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCircuitID, setEditCircuitID] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [circuitToDelete, setCircuitToDelete] = useState(null);

  // notification
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  // state matches circuitModel exactly
  const [newCircuit, setNewCircuit] = useState({
    circuitName: "",
    circuitMostWinID: "",
    circuitMostPoleID: "",
    circuitBestPole: "",
    circuitBestRaceLap: "",
    circuitTopSpeed: "", // number
    circuitCorner: "", // number
  });

  // fetch
  useEffect(() => {
    axios
      .get("http://localhost:8080/circuit")
      .then((res) => setCircuits(res.data || []))
      .catch((err) => {
        console.error(err);
        setMessage("Failed to load circuits");
        setIsError(true);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // numeric validation for top speed & corner: allow empty or non-negative integers
    if (["circuitTopSpeed", "circuitCorner"].includes(name)) {
      // allow empty string while editing
      if (value === "" || /^[0-9]+$/.test(value)) {
        setNewCircuit({ ...newCircuit, [name]: value });
      }
      return;
    }

    setNewCircuit({ ...newCircuit, [name]: value });
  };

  const handleAddCircuit = async () => {
    // basic required validation
    if (!newCircuit.circuitName || !newCircuit.circuitBestPole || !newCircuit.circuitBestRaceLap) {
      alert("Please fill circuitName, circuitBestPole and circuitBestRaceLap.");
      return;
    }

    // coerce numeric fields
    const payload = {
      ...newCircuit,
      circuitTopSpeed: newCircuit.circuitTopSpeed === "" ? 0 : Number(newCircuit.circuitTopSpeed),
      circuitCorner: newCircuit.circuitCorner === "" ? 0 : Number(newCircuit.circuitCorner),
    };

    try {
      const res = await axios.post("http://localhost:8080/circuit", payload);
      setCircuits([...circuits, res.data]);
      setMessage("Circuit added");
      setIsError(false);
      closeForm();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to add circuit");
      setIsError(true);
    }
  };

  const handleEdit = (id) => {
    // backend uses circuitID as id
    const selected = circuits.find((c) => c.circuitID === id);
    if (!selected) return;

    // map to form shape (ensure strings)
    setNewCircuit({
      circuitName: selected.circuitName || "",
      circuitMostWinID: selected.circuitMostWinID || "",
      circuitMostPoleID: selected.circuitMostPoleID || "",
      circuitBestPole: selected.circuitBestPole || "",
      circuitBestRaceLap: selected.circuitBestRaceLap || "",
      circuitTopSpeed: selected.circuitTopSpeed != null ? String(selected.circuitTopSpeed) : "",
      circuitCorner: selected.circuitCorner != null ? String(selected.circuitCorner) : "",
    });

    setEditCircuitID(id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdateCircuit = async () => {
    if (!editCircuitID) return;

    const payload = {
      ...newCircuit,
      circuitTopSpeed: newCircuit.circuitTopSpeed === "" ? 0 : Number(newCircuit.circuitTopSpeed),
      circuitCorner: newCircuit.circuitCorner === "" ? 0 : Number(newCircuit.circuitCorner),
    };

    try {
      const res = await axios.put(`http://localhost:8080/championship`, payload)
        .catch(() => { throw new Error("PUT endpoint placeholder"); });

      setCircuits(circuits.map((c) => (c.circuitID === editCircuitID ? { ...c, ...payload, circuitID: editCircuitID } : c)));

      setMessage("Circuit updated");
      setIsError(false);
      closeForm();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to update circuit");
      setIsError(true);
    }
  };

  const handleRemove = (id) => {
    setCircuitToDelete(id);
    setShowConfirmation(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(`http://localhost:8080/circuit/${circuitToDelete}`);
      setCircuits(circuits.filter((c) => c.circuitID !== circuitToDelete));
      setMessage("Circuit removed");
      setIsError(false);
      setShowConfirmation(false);
      setCircuitToDelete(null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete circuit");
      setIsError(true);
      setShowConfirmation(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditCircuitID(null);
    setNewCircuit({
      circuitName: "",
      circuitMostWinID: "",
      circuitMostPoleID: "",
      circuitBestPole: "",
      circuitBestRaceLap: "",
      circuitTopSpeed: "",
      circuitCorner: "",
    });
  };

  return (
    <div className={`teams-page ${theme}`}>
      <header className="header">
        <img src={mlbbBanner} alt="Banner" className="header-logo" />
        <nav className="nav-tabs">
          <button className="nav-btn" onClick={() => setShowForm(true)}>
            Add Circuit +
          </button>
          {["Europe", "Asia", "Americas", "Middle East", "All"].map((c) => (
            <button key={c} className="nav-btn">{c}</button>
          ))}
        </nav>
      </header>

      {message && (
        <div
          className="notification-box"
          style={{
            background: isError ? "#ffdddd" : "#ddffdd",
            color: isError ? "#d8000c" : "#4f8a10",
            padding: "12px",
            margin: "20px auto",
            width: "50%",
            textAlign: "center",
            borderRadius: "10px",
            border: isError ? "2px solid #d8000c" : "2px solid #4f8a10",
          }}
        >
          {message}
        </div>
      )}

      <main className="main-content">
        <h1 className="region-title">MotoGP Circuits Database</h1>
      </main>

      <section className="tournament-results">
        <div className="results-section">
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Most Wins</th>
                <th>Most Poles</th>
                <th>Best Pole</th>
                <th>Best Race Lap</th>
                <th>Top Speed</th>
                <th>Corners</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {circuits.length === 0 ? (
                <tr><td colSpan="9" style={{ textAlign: "center" }}>No circuits found.</td></tr>
              ) : (
                circuits.map((c) => (
                  <tr key={c.circuitID}>
                    <td>{c.circuitID}</td>
                    <td>{c.circuitName}</td>
                    <td>{c.circuitMostWinName || "-"}</td>
                    <td>{c.circuitMostPoleName || "-"}</td>
                    <td>{c.circuitBestPole}</td>
                    <td>{c.circuitBestRaceLap}</td>
                    <td>{c.circuitTopSpeed}</td>
                    <td>{c.circuitCorner}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(c.circuitID)}>Edit</button>
                      <button className="remove-btn" onClick={() => handleRemove(c.circuitID)}>Remove</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEditing ? "Edit Circuit" : "Add New Circuit"}</h2>

            <div className="form-group">
              <label>circuitName:</label>
              <input name="circuitName" value={newCircuit.circuitName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>circuitMostWinID:</label>
              <input name="circuitMostWinID" value={newCircuit.circuitMostWinID} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>circuitMostPoleID:</label>
              <input name="circuitMostPoleID" value={newCircuit.circuitMostPoleID} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>circuitBestPole:</label>
              <input name="circuitBestPole" value={newCircuit.circuitBestPole} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>circuitBestRaceLap:</label>
              <input name="circuitBestRaceLap" value={newCircuit.circuitBestRaceLap} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>circuitTopSpeed (number):</label>
              <input name="circuitTopSpeed" value={newCircuit.circuitTopSpeed} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>circuitCorner (number):</label>
              <input name="circuitCorner" value={newCircuit.circuitCorner} onChange={handleChange} />
            </div>

            <div className="modal-actions">
              <button className="add-btn" onClick={isEditing ? handleUpdateCircuit : handleAddCircuit}>
                {isEditing ? "Update" : "Add"}
              </button>
              <button className="back-btn" onClick={closeForm}>Back</button>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this circuit?</p>
            <div className="modal-actions">
              <button className="remove-btn" onClick={confirmRemove}>Yes, Remove</button>
              <button className="back-btn" onClick={() => setShowConfirmation(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MGPCircuitsBE;
