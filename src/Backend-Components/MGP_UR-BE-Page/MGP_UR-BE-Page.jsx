import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./MGP_UR-BE-Page.css";

import mlbbBanner from '../../assets/images/mgp_index/mgp_banner/mgp_bg.png';

const MGPnextRaceBE = ({ theme }) => {
  const [races, setRaces] = useState([]);

  // modal states
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editRaceID, setEditRaceID] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [raceToDelete, setRaceToDelete] = useState(null);

  // FORM INPUT
  const [newRace, setNewRace] = useState({
    raceDate: "",
    raceTitle: "",
    circuitID: "",
    racePhoto: "",
  });

  //Fetch
  useEffect(() => {
    axios
      .get("http://localhost:8080/MGP_nextRace")
      .then((res) => setRaces(res.data))
      .catch((err) => console.error(err));
  }, []);

  //Form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRace({ ...newRace, [name]: value });
  };

  //Create
  const handleAddRace = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/MGP_nextRace",
        newRace
      );
      setRaces([...races, res.data]);
      closeForm();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding race");
    }
  };

  //Edit
  const handleEdit = (id) => {
    const selected = races.find((r) => r.raceID === id);
    if (!selected) return;

    setEditRaceID(id);
    setNewRace({
      raceDate: selected.raceDate || "",
      raceTitle: selected.raceTitle || "",
      circuitID: selected.circuitID || "",
      racePhoto: selected.racePhoto || "",
    });

    setIsEditing(true);
    setShowForm(true);
  };

  //Update
  const handleUpdateRace = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/MGP_nextRace/${editRaceID}`,
        newRace
      );

      setRaces(
        races.map((r) =>
          r.raceID === editRaceID ? res.data : r
        )
      );

      closeForm();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating race");
    }
  };

  //Delete
  const handleRemove = (id) => {
    setRaceToDelete(id);
    setShowConfirmation(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/MGP_nextRace/${raceToDelete}`
      );
      setRaces(races.filter((r) => r.raceID !== raceToDelete));
      setShowConfirmation(false);
      setRaceToDelete(null);
    } catch (err) {
      alert("Error deleting race");
    }
  };

  //Close
  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditRaceID(null);
    setNewRace({
      raceDate: "",
      raceTitle: "",
      circuitID: "",
      racePhoto: "",
    });
  };

  return (
    <div className={`teams-page ${theme}`}>
      {/* HEADER */}
      <header className="header">
        <img src={mlbbBanner} alt="Banner" className="header-logo" />
        <nav className="nav-tabs">
          <button className="nav-btn" onClick={() => setShowForm(true)}>
            Add Race +
          </button>
        </nav>
      </header>

      {/* MAIN */}
      <main className="main-content">
        <h1 className="region-title">MotoGP Next Race Database</h1>
      </main>

      {/* TABLE */}
      <section className="tournament-results">
        <div className="results-section">
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Race Title</th>
                <th>Race Date</th>
                <th>Circuit</th>
                <th>Photo</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {races.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No races found.
                  </td>
                </tr>
              ) : (
                races.map((r) => (
                  <tr key={r.raceID}>
                    <td>{r.raceID}</td>
                    <td>{r.raceTitle}</td>
                    <td>{r.raceDate}</td>
                    <td>{r.raceCircuit || "-"}</td>

                    {/* PHOTO */}
                    <td>
                      {r.racePhoto ? (
                        <img
                          src={r.racePhoto}
                          alt={r.raceTitle}
                          style={{
                            width: "90px",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                          className="team-icon"
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(r.raceID)}
                      >
                        Edit
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(r.raceID)}
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
            <h2>{isEditing ? "Edit Race" : "Add New Race"}</h2>

            <div className="form-group">
              <label>Race Title</label>
              <input
                name="raceTitle"
                value={newRace.raceTitle}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Race Date</label>
              <input
                name="raceDate"
                value={newRace.raceDate}
                onChange={handleChange}
                placeholder="2025-11-23T15:00:00"
              />
            </div>

            <div className="form-group">
              <label>Circuit ID</label>
              <input
                name="circuitID"
                value={newRace.circuitID}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Race Photo URL</label>
              <input
                name="racePhoto"
                value={newRace.racePhoto}
                onChange={handleChange}
              />
            </div>

            <div className="modal-actions">
              <button
                className="add-btn"
                onClick={isEditing ? handleUpdateRace : handleAddRace}
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

export default MGPnextRaceBE;
