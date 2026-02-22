import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./BDM_Tournament-BE-Page.css";

import banner from "../../assets/images/BDM_Page/banner.png";

const BadmintonTournamentsBE = ({ theme }) => {

  /* =========================
     STATE
  ========================= */
  const [tournaments, setTournaments] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    startDate: "",
    endDate: "",
    location: "",
    status: ""
  });

  /* =========================
     FETCH
  ========================= */
  useEffect(() => {
    axios
      .get("http://localhost:8080/badminton/tournaments")
      .then(res => setTournaments(res.data || []))
      .catch(err => console.error(err));
  }, []);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/badminton/tournaments",
        form
      );
      setTournaments([...tournaments, res.data]);
      closeForm();
    } catch {
      alert("Error adding tournament");
    }
  };

  const handleEdit = (t) => {
    setEditId(t.id);
    setForm({
      name: t.name,
      category: t.category,
      startDate: t.startDate,
      endDate: t.endDate,
      location: t.location,
      status: t.status
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/badminton/tournaments/${editId}`,
        form
      );

      setTournaments(
        tournaments.map(t =>
          t.id === editId ? res.data : t
        )
      );

      closeForm();
    } catch {
      alert("Error updating tournament");
    }
  };

  const handleRemove = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/badminton/tournaments/${deleteId}`
      );

      setTournaments(
        tournaments.filter(t => t.id !== deleteId)
      );

      setShowConfirm(false);
      setDeleteId(null);
    } catch {
      alert("Error deleting tournament");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
    setForm({
      name: "",
      category: "",
      startDate: "",
      endDate: "",
      location: "",
      status: ""
    });
  };

  /* =========================
     JSX
  ========================= */
  return (
    <div className={`teams-page ${theme}`}>

      <header className="header">
        <img src={banner} alt="Banner" className="header-logo" />
        <nav className="nav-tabs">
          <button className="nav-btn" onClick={() => setShowForm(true)}>
            Add Tournament +
          </button>
        </nav>
      </header>

      <main className="main-content">
        <h1 className="region-title">Badminton Tournaments Database</h1>
      </main>

      <section className="tournament-results">
        <div className="results-section">
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tournaments.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No tournaments found.
                  </td>
                </tr>
              ) : (
                tournaments.map(t => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.name}</td>
                    <td>{t.category}</td>
                    <td>{t.startDate}</td>
                    <td>{t.endDate}</td>
                    <td>{t.status}</td>
                    <td>{t.location}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(t)}
                      >
                        Edit
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(t.id)}
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
            <h2>{isEditing ? "Edit Tournament" : "Add Tournament"}</h2>

            {["name", "category", "startDate", "endDate", "location"].map(f => (
              <div className="form-group" key={f}>
                <label>{f}</label>
                <input
                  name={f}
                  value={form[f]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="">Select status</option>
                <option value="past">Past</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>

            <div className="modal-actions">
              <button
                className="add-btn"
                onClick={isEditing ? handleUpdate : handleAdd}
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

      {showConfirm && (
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
                onClick={() => setShowConfirm(false)}
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

export default BadmintonTournamentsBE;
