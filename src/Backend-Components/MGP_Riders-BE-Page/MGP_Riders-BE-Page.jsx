import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./MGP_Riders-BE-Page.css";

import mlbbBanner from '../../assets/images/mgp_index/mgp_banner/mgp_bg.png';

const MGPRidersBE = ({ theme }) => {
  const [riders, setRiders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editRiderID, setEditRiderID] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [riderToDelete, setRiderToDelete] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const riderFields = [
    "rName",
    "rTeam",
    "rTitleCount",
    "rNationality",
    "rAge",
    "rCategory",
    "rWins",
    "rPodiums",
    "rTotalRaces",
    "rPhoto"
  ];

  const categoryOptions = ["MotoGP", "Moto2", "Moto3", "Legends", "Retired"];
  const categoriesWithAll = ["All", ...categoryOptions];

  const [newRider, setNewRider] = useState({
    rName: "",
    rTeam: "",
    rTitleCount: "",
    rNationality: "",
    rAge: "",
    rCategory: "",
    rWins: "",
    rPodiums: "",
    rTotalRaces: "",
    rPhoto: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/rider")
      .then((res) => setRiders(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRider({ ...newRider, [name]: value });
  };

  //ADD RIDER + NOTIFICATION
  const handleAddRider = async () => {
    try {
      const res = await axios.post("http://localhost:8080/rider", newRider);

      setRiders([...riders, res.data]);
      alert(`Rider "${res.data.rName}" added successfully!`);

      closeForm();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message); // <-- Duplicate name message from Spring Boot
      } else {
        alert("Failed to add rider.");
      }
    }
  };

  const handleEdit = (id) => {
    const selected = riders.find((r) => r.rId === id);
    if (selected) {
      setEditRiderID(id);
      setNewRider(selected);
      setIsEditing(true);
      setShowForm(true);
    }
  };

  //UPDATE RIDER + NOTIFICATION
  const handleUpdateRider = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/rider/${editRiderID}`,
        newRider
      );

      setRiders(riders.map((r) => (r.rId === editRiderID ? res.data : r)));
      alert(`Rider "${res.data.rName}" updated successfully!`);

      closeForm();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message); // <-- Duplicate name or other backend error
      } else {
        alert("Failed to update rider.");
      }
    }
  };

  const handleRemove = (id) => {
    setRiderToDelete(id);
    setShowConfirmation(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(`http://localhost:8080/rider/${riderToDelete}`);
      setRiders(riders.filter((r) => r.rId !== riderToDelete));

      setIsError(false);
      setMessage("Rider deleted successfully!");

      setShowConfirmation(false);
    } catch (err) {
      setIsError(true);
      setMessage("Error deleting rider.");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditRiderID(null);
    setNewRider({
      rName: "",
      rTeam: "",
      rTitleCount: "",
      rNationality: "",
      rAge: "",
      rCategory: "",
      rWins: "",
      rPodiums: "",
      rTotalRaces: "",
      rPhoto: "",
    });
  };

  const filteredRiders =
    selectedCategory === "All"
      ? riders
      : riders.filter((r) => r.rCategory === selectedCategory);

  return (
    <div className={`teams-page ${theme}`}>
      <header className="header">
        <img src={mlbbBanner} alt="Banner" className="header-logo" />

        <nav className="nav-tabs">
          <button className="nav-btn" onClick={() => setShowForm(true)}>
            Add Rider +
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

      {/*NOTIFICATION UI */}
      {message && (
        <div
          className="notification-box"
          style={{
            background: isError ? "#ffdddd" : "#ddffdd",
            color: isError ? "#d8000c" : "#4f8a10",
            margin: "20px auto",
            padding: "12px",
            width: "50%",
            borderRadius: "10px",
            textAlign: "center",
            border: isError ? "2px solid #d8000c" : "2px solid #4f8a10",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}

      <main className="main-content">
        <h1 className="region-title">Riders Database</h1>
      </main>

      <section className="tournament-results">
        <div className="results-section">
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Team</th>
                <th>Titles</th>
                <th>Nationality</th>
                <th>Age</th>
                <th>Category</th>
                <th>Wins</th>
                <th>Podiums</th>
                <th>Total Races</th>
                <th>Photo</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRiders.length === 0 ? (
                <tr>
                  <td colSpan="12" style={{ textAlign: "center" }}>
                    No riders found.
                  </td>
                </tr>
              ) : (
                filteredRiders.map((r) => (
                  <tr key={r.rId}>
                    <td>{r.rId}</td>
                    <td>{r.rName}</td>
                    <td>{r.rTeam}</td>
                    <td>{r.rTitleCount}</td>
                    <td>{r.rNationality}</td>
                    <td>{r.rAge}</td>
                    <td>{r.rCategory}</td>
                    <td>{r.rWins}</td>
                    <td>{r.rPodiums}</td>
                    <td>{r.rTotalRaces}</td>
                    <td>
                      {r.rPhoto ? (
                        <img
                          src={r.rPhoto}
                          alt={r.rName}
                          className="team-icon"
                        />
                      ) : (
                        <span style={{ opacity: 0.5 }}>No Photo</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(r.rId)}
                      >
                        Edit
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(r.rId)}
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

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEditing ? "Edit Rider" : "Add New Rider"}</h2>

            {riderFields.map((field) => (
              <div className="form-group" key={field}>
                <label>{field.toUpperCase()}:</label>

                {field === "rCategory" ? (
                  <select
                    name="rCategory"
                    value={newRider.rCategory}
                    onChange={handleChange}
                  >
                    <option value="">-- Select Category --</option>
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={field}
                    value={newRider[field] || ""}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}

            {newRider.rPhoto && (
              <img
                src={newRider.rPhoto}
                alt="Preview"
                className="logo-preview"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}

            <div className="modal-actions">
              <button
                className="add-btn"
                onClick={isEditing ? handleUpdateRider : handleAddRider}
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

      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this rider?</p>
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

export default MGPRidersBE;
