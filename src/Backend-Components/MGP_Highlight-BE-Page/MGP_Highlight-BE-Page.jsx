import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./MGP_Highlight-BE-Page.css";

import mlbbBanner from '../../assets/images/mgp_index/mgp_banner/mgp_bg.png';

const MGPHighlightBE = ({ theme }) => {
  const [highlights, setHighlights] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [highlightToDelete, setHighlightToDelete] = useState(null);

  const [newHighlight, setNewHighlight] = useState({
    highlightTitle: "",
    highlightLinkVideo: "",
    highlightImage: "",
  });

  //Get
  useEffect(() => {
    axios
      .get("http://localhost:8080/highlight")
      .then((res) => setHighlights(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHighlight({ ...newHighlight, [name]: value });
  };

  //Add
  const handleAddHighlight = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/highlight",
        newHighlight
      );

      setHighlights([...highlights, res.data]);
      alert(`Highlight "${res.data.highlightTitle}" added!`);

      closeForm();
    } catch (err) {
      alert("Failed to add highlight.");
    }
  };

  //Edit
  const handleEdit = (id) => {
    const selected = highlights.find((h) => h.highlightID === id);
    if (selected) {
      setEditID(id);
      setNewHighlight(selected);
      setIsEditing(true);
      setShowForm(true);
    }
  };

  //Update
  const handleUpdateHighlight = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/highlight/${editID}`,
        newHighlight
      );

      setHighlights(
        highlights.map((h) =>
          h.highlightID === editID ? res.data : h
        )
      );

      alert("Highlight updated!");
      closeForm();
    } catch (err) {
      alert("Failed to update highlight.");
    }
  };

  //Delete
  const handleRemove = (id) => {
    setHighlightToDelete(id);
    setShowConfirmation(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/highlight/${highlightToDelete}`
      );

      setHighlights(
        highlights.filter((h) => h.highlightID !== highlightToDelete)
      );

      alert("Highlight deleted!");
      setShowConfirmation(false);

    } catch (err) {
      alert("Failed to delete highlight.");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditID(null);

    setNewHighlight({
      highlightTitle: "",
      highlightLinkVideo: "",
      highlightImage: "",
    });
  };

  return (
    <div className={`teams-page ${theme}`}>

      {/* HEADER */}
      <header className="header">
        <img src={mlbbBanner} alt="Banner" className="header-logo" />

        <nav className="nav-tabs">
          <button className="nav-btn" onClick={() => setShowForm(true)}>
            Add Highlight +
          </button>

          {["MotoGP", "Moto2", "Moto3", "Legends", "Retired", "All"].map(c => (
            <button key={c} className="nav-btn">{c}</button>
          ))}
        </nav>
      </header>

      <main className="main-content">
        <h1 className="region-title">Highlight</h1>
      </main>

      {/* TABLE */}
      <section className="tournament-results">
        <div className="results-section">
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Link</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {highlights.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No highlights available.
                  </td>
                </tr>
              ) : (
                highlights.map((h) => (
                  <tr key={h.highlightID}>
                    <td>{h.highlightID}</td>
                    <td>{h.highlightTitle}</td>
                    <td>{h.highlightLinkVideo}</td>

                    <td>
                      {h.highlightImage ? (
                        <img
                          src={h.highlightImage}
                          alt="preview"
                          className="team-icon"
                        />
                      ) : (
                        <span style={{ opacity: 0.5 }}>No image</span>
                      )}
                    </td>

                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(h.highlightID)}>
                        Edit
                      </button>

                      <button className="remove-btn" onClick={() => handleRemove(h.highlightID)}>
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

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEditing ? "Edit Highlight" : "Add Highlight"}</h2>

            <div className="form-group">
              <label>Title:</label>
              <input
                name="highlightTitle"
                value={newHighlight.highlightTitle}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Video Link:</label>
              <input
                name="highlightLinkVideo"
                value={newHighlight.highlightLinkVideo}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Image URL:</label>
              <input
                name="highlightImage"
                value={newHighlight.highlightImage}
                onChange={handleChange}
              />
            </div>

            <div className="modal-actions">
              <button
                className="add-btn"
                onClick={isEditing ? handleUpdateHighlight : handleAddHighlight}
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
            <p>Are you sure you want to delete this highlight?</p>

            <div className="modal-actions">
              <button className="remove-btn" onClick={confirmRemove}>
                Yes, Remove
              </button>

              <button className="back-btn" onClick={() => setShowConfirmation(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MGPHighlightBE;
