import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./MGP_HoF-BE-Page.css";

import mlbbBanner from '../../assets/images/mgp_index/mgp_banner/mgp_bg.png';

const MGPHoFBE = ({ theme }) => {
  const [hofs, setHofs] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hofToDelete, setHofToDelete] = useState(null);

  const [newHof, setNewHof] = useState({
    riderID: "",           // rider NAME
    yearsActive1: "",
    yearsActive2: "",
    riderNationality: "",
  });

  //Fetch
  useEffect(() => {
    axios
      .get("http://localhost:8080/MGP_HoF")
      .then((res) => setHofs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHof({ ...newHof, [name]: value });
  };

  //Add
  const handleAddHoF = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/MGP_HoF",
        newHof
      );

      setHofs([...hofs, res.data]);
      alert("Hall of Fame added!");
      closeForm();
    } catch (err) {
      alert("Failed to add HoF.");
    }
  };

  //Edit
  const handleEdit = (id) => {
    const selected = hofs.find((h) => h.hofID === id);
    if (selected) {
      setEditID(id);
      setNewHof({
        riderID: selected.riderID,
        yearsActive1: selected.yearsActive1,
        yearsActive2: selected.yearsActive2,
        riderNationality: selected.riderNationality,
      });
      setIsEditing(true);
      setShowForm(true);
    }
  };

  //Update
  const handleUpdateHoF = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/MGP_HoF/${editID}`,
        newHof
      );

      setHofs(
        hofs.map((h) => (h.hofID === editID ? res.data : h))
      );

      alert("Hall of Fame updated!");
      closeForm();
    } catch (err) {
      alert("Failed to update HoF.");
    }
  };

  //Delete
  const handleRemove = (id) => {
    setHofToDelete(id);
    setShowConfirmation(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/MGP_HoF/${hofToDelete}`
      );

      setHofs(hofs.filter((h) => h.hofID !== hofToDelete));
      setShowConfirmation(false);

      alert("Hall of Fame deleted!");
    } catch (err) {
      alert("Failed to delete HoF.");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditID(null);

    setNewHof({
      riderID: "",
      yearsActive1: "",
      yearsActive2: "",
      riderNationality: "",
    });
  };

  return (
    <div className={`teams-page ${theme}`}>
      {/* HEADER */}
      <header className="header">
        <img src={mlbbBanner} alt="Banner" className="header-logo" />

        <nav className="nav-tabs">
          <button className="nav-btn" onClick={() => setShowForm(true)}>
            Add HoF +
          </button>
        </nav>
      </header>

      {/* TITLE */}
      <main className="main-content">
        <h1 className="region-title">Hall of Fame</h1>
      </main>

      {/* TABLE */}
      <section className="tournament-results">
        <div className="results-section">
          <table className="results-table">
            <thead>
              <tr>
                <th>Rider ID</th>
                <th>Rider Name</th>
                <th>Active Years</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {hofs.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No Hall of Fame data.
                  </td>
                </tr>
              ) : (
                hofs.map((h) => (
                  <tr key={h.hofID}>
                    <td>{h.riderID}</td>
                    <td>{h.riderName}</td>
                    <td>
                      {h.yearsActive1} - {h.yearsActive2}
                    </td>
                    <td>{h.riderNationality}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(h.hofID)}
                      >
                        Edit
                      </button>

                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(h.hofID)}
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

      {/* MODAL ADD / EDIT */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEditing ? "Edit HoF" : "Add HoF"}</h2>

            <div className="form-group">
              <label>Rider Name:</label>
              <input
                name="riderID"
                value={newHof.riderID}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Start Year:</label>
              <input
                name="yearsActive1"
                value={newHof.yearsActive1}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>End Year:</label>
              <input
                name="yearsActive2"
                value={newHof.yearsActive2}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Country:</label>
              <input
                name="riderNationality"
                value={newHof.riderNationality}
                onChange={handleChange}
              />
            </div>

            <div className="modal-actions">
              <button
                className="add-btn"
                onClick={isEditing ? handleUpdateHoF : handleAddHoF}
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

      {/* DELETE CONFIRM */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this Hall of Fame?</p>

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

export default MGPHoFBE;
