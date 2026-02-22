import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./MGP_Transfer-BE-Page.css";

import mlbbBanner from "../../assets/images/mlbb_teams/mlbb_banner.png";

const MGPTransfersBE = ({ theme }) => {
  const [transfers, setTransfers] = useState([]);

  // modal states
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTransferID, setEditTransferID] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transferToDelete, setTransferToDelete] = useState(null);

  // FORM INPUT => harus sama seperti transferModel (riderID, teamID1, teamID2)
  const [newTransfer, setNewTransfer] = useState({
    riderID: "",
    teamID1: "",
    teamID2: "",
  });

  // Fetch transfers
  useEffect(() => {
    axios
      .get("http://localhost:8080/transfer")
      .then((res) => setTransfers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Form input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransfer({ ...newTransfer, [name]: value });
  };

  // Add transfer
  const handleAddTransfer = async () => {
    try {
      const res = await axios.post("http://localhost:8080/transfer", newTransfer);
      setTransfers([...transfers, res.data]);
      closeForm();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding transfer");
    }
  };

  // Edit transfer (load data to form)
  const handleEdit = (id) => {
    const selected = transfers.find((t) => t.transferID === id);

    if (selected) {
      setEditTransferID(id);

      setNewTransfer({
        riderID: selected.riderID || "",
        teamID1: selected.teamID1 || "",
        teamID2: selected.teamID2 || "",
      });

      setIsEditing(true);
      setShowForm(true);
    }
  };

  // Update transfer
  const handleUpdateTransfer = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/transfer/${editTransferID}`,
        newTransfer
      );

      setTransfers(
        transfers.map((t) =>
          t.transferID === editTransferID ? res.data : t
        )
      );

      closeForm();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating transfer");
    }
  };

  // Remove transfer
  const handleRemove = (id) => {
    setTransferToDelete(id);
    setShowConfirmation(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(`http://localhost:8080/transfer/${transferToDelete}`);
      setTransfers(transfers.filter((t) => t.transferID !== transferToDelete));
      setShowConfirmation(false);
      setTransferToDelete(null);
    } catch (err) {
      alert("Error deleting transfer");
    }
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditTransferID(null);

    setNewTransfer({
      riderID: "",
      teamID1: "",
      teamID2: "",
    });
  };

  return (
    <div className={`teams-page ${theme}`}>
      <header className="header">
        <img src={mlbbBanner} alt="Banner" className="header-logo" />

        <nav className="nav-tabs">
          <button className="nav-btn" onClick={() => setShowForm(true)}>
            Add Transfer +
          </button>
        </nav>
      </header>

      <main className="main-content">
        <h1 className="region-title">Transfers Database</h1>
      </main>

      {/* TABLE */}
      <section className="tournament-results">
        <div className="results-section">
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Rider</th>
                <th>From Team</th>
                <th>To Team</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {transfers.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No transfers found.
                  </td>
                </tr>
              ) : (
                transfers.map((t) => (
                  <tr key={t.transferID}>
                    <td>{t.transferID}</td>
                    <td>{t.riderName || "-"}</td>
                    <td>{t.teamName1 || "-"}</td>
                    <td>{t.teamName2 || "-"}</td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(t.transferID)}
                      >
                        Edit
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(t.transferID)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* FORM MODAL */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEditing ? "Edit Transfer" : "Add New Transfer"}</h2>

            <div className="form-group">
              <label>Rider ID:</label>
              <input
                name="riderID"
                value={newTransfer.riderID}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>From Team ID:</label>
              <input
                name="teamID1"
                value={newTransfer.teamID1}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>To Team ID:</label>
              <input
                name="teamID2"
                value={newTransfer.teamID2}
                onChange={handleChange}
              />
            </div>

            <div className="modal-actions">
              <button
                className="add-btn"
                onClick={isEditing ? handleUpdateTransfer : handleAddTransfer}
              >
                {isEditing ? "Update" : "Add"}
              </button>

              <button className="back-btn" onClick={closeForm}>
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="remove-btn" onClick={confirmRemove}>
                Yes, Remove
              </button>
              <button
                className="back-btn"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MGPTransfersBE;
