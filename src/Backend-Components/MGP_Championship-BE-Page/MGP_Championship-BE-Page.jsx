import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./MGP_Championship-BE-Page.css";

import mlbbBanner from '../../assets/images/mgp_index/mgp_banner/mgp_bg.png';

const MGPChampionshipBE = ({ theme }) => {

  //Championship states
  const [championship, setChampionship] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  //Form states
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editChampionshipID, setEditChampionshipID] = useState(null);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [championshipToDelete, setChampionshipToDelete] = useState(null);

  //Championship input
  const [newChampionship, setNewChampionship] = useState({
    cYear: "",
    cCategory: "",
    standings: [],
  });

  //Standings input
  const [newStanding, setNewStanding] = useState({
    riderId: "",
    teamId: "",
    points: 0,
  });

  //Categories
  const categoryOptions = ["MotoGP", "Moto2", "Moto3"];
  const categoriesWithAll = ["All", ...categoryOptions];

  //Fetch section
  useEffect(() => {
    axios
      .get("http://localhost:8080/championship")
      .then((res) => setChampionship(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewChampionship({ ...newChampionship, [name]: value });
  };

  //Add standing
  const handleAddStanding = () => {
  if (!newStanding.riderId || !newStanding.teamId) {
    alert("Please input both Rider ID and Team ID");
    return;
  }

  //Validate the points
  if (!/^[0-9]+$/.test(newStanding.points)) {
    alert("Points must be a positive number (non-negative).");
    return;
  }

  //Prevent same rider in championship
  const exists = newChampionship.standings.some(
    (s) => String(s.riderId) === String(newStanding.riderId)
  );

  if (exists) {
    alert("This rider is already added to the standings.");
    return;
  }

  setNewChampionship({
    ...newChampionship,
    standings: [...newChampionship.standings, { ...newStanding }],
  });

  //reset input
  setNewStanding({
    riderId: "",
    teamId: "",
    points: 0,
  });
};

  //Remove the standing
  const handleRemoveStanding = (index) => {
    const updated = [...newChampionship.standings];
    updated.splice(index, 1); //.splice(index, 1) removes the element at the specified index
    setNewChampionship({
      ...newChampionship,
      standings: updated, //Overwrite the standings
    });
  };

  //Edit the championship
  const handleEdit = (id) => {
    const selected = championship.find((c) => c.cId === id);

    if (!selected) return;

    setEditChampionshipID(id);
    setNewChampionship({
      cYear: selected.cYear,
      cCategory: selected.cCategory,
      standings: selected.standings ? [...selected.standings] : [],
    });

    setIsEditing(true);
    setShowForm(true);
  };

  //Add championship
  const handleAddChampionship = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/championship",
        newChampionship
      );

      setChampionship([...championship, res.data]);
      closeForm();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding championship");
    }
  };

  //Update the championship
  const handleUpdateChampionship = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/championship/${editChampionshipID}`,
        newChampionship
      );

      setChampionship(
        championship.map((c) =>
          c.cId === editChampionshipID ? res.data : c
        )
      );

      closeForm();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating championship");
    }
  };

  // Delete
  const handleRemove = (id) => {
    setChampionshipToDelete(id);
    setShowConfirmation(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/championship/${championshipToDelete}`
      );

      setChampionship(
        championship.filter((c) => c.cId !== championshipToDelete)
      );

      setShowConfirmation(false);
      setChampionshipToDelete(null);
    } catch (err) {
      alert("Error deleting championship");
    }
  };

  // Close
  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditChampionshipID(null);

    setNewChampionship({
      cYear: "",
      cCategory: "",
      standings: [],
    });

    setNewStanding({
      riderId: "",
      teamId: "",
      points: 0,
    });
  };

  //Filter
  const filteredChampionships =
    selectedCategory === "All"
      ? championship
      : championship.filter((c) => c.cCategory === selectedCategory);

  return (
    <div className={`teams-page ${theme}`}>
      {/* HEADER */}
      <header className="header">
        <img src={mlbbBanner} alt="Banner" className="header-logo" />
        <nav className="nav-tabs">
          <button className="nav-btn" onClick={() => setShowForm(true)}>
            Add Championship +
          </button>

          {categoriesWithAll.map((c) => (
            <button
              key={c}
              className={`nav-btn ${selectedCategory === c ? "active-tab" : ""}`}
              onClick={() => setSelectedCategory(c)}
            >
              {c}
            </button>
          ))}
        </nav>
      </header>

      {/* TITLE */}
      <main className="main-content">
        <h1 className="region-title">Championship Database</h1>
      </main>

      {/* TABLE */}
      <section className="tournament-results">
        <div className="results-section">
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Year</th>
                <th>Category</th>
                <th>Total Riders</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredChampionships.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No championship found.
                  </td>
                </tr>
              ) : (
                filteredChampionships.map((c) => (
                  <tr key={c.cId}>
                    <td>{c.cId}</td>
                    <td>{c.cYear}</td>
                    <td>{c.cCategory}</td>
                    <td>{c.standings?.length || 0}</td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(c.cId)}
                      >
                        Edit
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(c.cId)}
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
            <h2>{isEditing ? "Edit Championship" : "Add New Championship"}</h2>

            {/* YEAR */}
            <div className="form-group">
              <label>Year:</label>
              <input
                name="cYear"
                value={newChampionship.cYear}
                onChange={handleChange}
              />
            </div>

            {/* CATEGORY */}
            <div className="form-group">
              <label>Category:</label>
              <select
                name="cCategory"
                value={newChampionship.cCategory}
                onChange={handleChange}
              >
                <option value="">-- Select Category --</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* STANDINGS INPUT */}
            <div className="form-group">
              <label>Add Rider to Standings:</label>

              <input
                type="text"
                placeholder="Rider ID"
                value={newStanding.riderId}
                onChange={(e) =>
                  setNewStanding({ ...newStanding, riderId: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Team ID"
                value={newStanding.teamId}
                onChange={(e) =>
                  setNewStanding({ ...newStanding, teamId: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Points"
                value={newStanding.points}
                onChange={(e) =>
                  setNewStanding({ ...newStanding, points: e.target.value })
                }
              />

              <button className="add-btn" onClick={handleAddStanding}>
                Add Rider to Championship
              </button>
            </div>

            {/* SHOW STANDINGS */}
            <div className="standings-list">
              <h4>Standings Added:</h4>
              {newChampionship.standings.length === 0 ? (
                <p>No riders added yet.</p>
              ) : (
                newChampionship.standings.map((s, index) => (
                  <div key={`${s.riderId}-${index}`} className="standing-item" style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <div>
                      <p><b>Rider:</b> {s.riderId}</p>
                      <p><b>Team:</b> {s.teamId}</p>
                      <p><b>Points:</b> {s.points}</p>
                    </div>

                    {/* Remove button for each standing */}
                    <button
                      className="remove-standing"
                      onClick={() => handleRemoveStanding(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="modal-actions">
              <button
                className="add-btn"
                onClick={
                  isEditing ? handleUpdateChampionship : handleAddChampionship
                }
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

export default MGPChampionshipBE;
