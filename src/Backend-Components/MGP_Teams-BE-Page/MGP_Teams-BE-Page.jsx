import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./MGP_Teams-BE-Page.css";

import mlbbBanner from '../../assets/images/mgp_index/mgp_banner/mgp_bg.png';

const MGPTeamsBE = ({ theme }) => {
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTeamID, setEditTeamID] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // FORM INPUT => harus sama seperti TeamModel
  const [newTeam, setNewTeam] = useState({
    tName: "",
    tRegion: "",
    tCategory: "",
    rId1: "",
    rId2: "",
    tLogo: "",
  });

  const categoryOptions = ["MotoGP", "Moto2", "Moto3"];
  const categoriesWithAll = ["All", ...categoryOptions];

  // Fetch teams
  useEffect(() => {
    axios
      .get("http://localhost:8080/team")
      .then((res) => setTeams(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Form input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  // Add team
  const handleAddTeam = async () => {
    try {
      const res = await axios.post("http://localhost:8080/team", newTeam);
      setTeams([...teams, res.data]);
      closeForm();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding team");
    }
  };

  // Edit team (load data to form)
  const handleEdit = (id) => {
    const selected = teams.find((t) => t.tId === id);

    if (selected) {
      setEditTeamID(id);

      setNewTeam({
        tName: selected.tName,
        tRegion: selected.tRegion,
        tCategory: selected.tCategory,
        rId1: selected.rId1 || "",
        rId2: selected.rId2 || "",
        tLogo: selected.tLogo || "",
      });

      setIsEditing(true);
      setShowForm(true);
    }
  };

  // Update team
  const handleUpdateTeam = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/team/${editTeamID}`,
        newTeam
      );

      setTeams(
        teams.map((t) => (t.tId === editTeamID ? res.data : t))
      );

      closeForm();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating team");
    }
  };

  // Remove team
  const handleRemove = (id) => {
    setTeamToDelete(id);
    setShowConfirmation(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(`http://localhost:8080/team/${teamToDelete}`);
      setTeams(teams.filter((t) => t.tId !== teamToDelete));
      setShowConfirmation(false);
      setTeamToDelete(null);
    } catch (err) {
      alert("Error deleting team");
    }
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditTeamID(null);

    setNewTeam({
      tName: "",
      tRegion: "",
      tCategory: "",
      rId1: "",
      rId2: "",
      tLogo: "",
    });
  };

  const filteredTeams =
    selectedCategory === "All"
      ? teams
      : teams.filter((t) => t.tCategory === selectedCategory);

  return (
    <div className={`teams-page ${theme}`}>
      <header className="header">
        <img src={mlbbBanner} alt="Banner" className="header-logo" />

        <nav className="nav-tabs">
          <button className="nav-btn" onClick={() => setShowForm(true)}>
            Add Team +
          </button>

          {categoriesWithAll.map((c) => (
            <button
              key={c}
              className={`nav-btn ${
                selectedCategory === c ? "active-tab" : ""
              }`}
              onClick={() => setSelectedCategory(c)}
            >
              {c}
            </button>
          ))}
        </nav>
      </header>

      <main className="main-content">
        <h1 className="region-title">Teams Database</h1>
      </main>

      {/* TABLE */}
      <section className="tournament-results">
        <div className="results-section">
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Team Name</th>
                <th>Region</th>
                <th>Category</th>
                <th>Rider 1</th>
                <th>Rider 2</th>
                <th>Photo</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTeams.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No teams found.
                  </td>
                </tr>
              ) : (
                filteredTeams.map((t) => (
                  <tr key={t.tId}>
                    <td>{t.tId}</td>
                    <td>{t.tName}</td>
                    <td>{t.tRegion}</td>
                    <td>{t.tCategory}</td>

                    {/* riderName1 & riderName2 come from DTO */}
                    <td>{t.riderName1 || "-"}</td>
                    <td>{t.riderName2 || "-"}</td>

                    <td>
                      {t.tLogo ? (
                        <img src={t.tLogo} alt="" className="team-icon" />
                      ) : (
                        <span style={{ opacity: 0.6 }}>No Photo</span>
                      )}
                    </td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(t.tId)}
                      >
                        Edit
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(t.tId)}
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
            <h2>{isEditing ? "Edit Team" : "Add New Team"}</h2>

            <div className="form-group">
              <label>Team Name:</label>
              <input
                name="tName"
                value={newTeam.tName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Region:</label>
              <input
                name="tRegion"
                value={newTeam.tRegion}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category:</label>
              <select
                name="tCategory"
                value={newTeam.tCategory}
                onChange={handleChange}
              >
                <option value="">-- Select Category --</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Rider IDs */}
            <div className="form-group">
              <label>Rider ID 1:</label>
              <input
                name="rId1"
                value={newTeam.rId1}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Rider ID 2:</label>
              <input
                name="rId2"
                value={newTeam.rId2}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Team Logo (URL):</label>
              <input
                name="tLogo"
                placeholder="https://example.com/logo.png"
                value={newTeam.tLogo}
                onChange={handleChange}
              />
            </div>

            {newTeam.tLogo && (
              <img
                src={newTeam.tLogo}
                alt="Team Logo Preview"
                className="logo-preview"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}

            <div className="modal-actions">
              <button
                className="add-btn"
                onClick={isEditing ? handleUpdateTeam : handleAddTeam}
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

export default MGPTeamsBE;
