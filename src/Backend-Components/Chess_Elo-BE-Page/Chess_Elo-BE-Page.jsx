import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./Chess_Elo-BE-Page.css"; 
// ⬆️ pake CSS yang sama biar konsisten

import banner from "../../assets/images/Chess_Page/chess_banner.png";

const ChessEloBE = ({ theme }) => {

  /* =========================
     STATE
  ========================= */
  const [elos, setElos] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    playerName: "",
    nationality: "",
    eloRating: "",
    worldRank: "",
    title: "",
    active: true
  });

  /* =========================
     FETCH
  ========================= */
  useEffect(() => {
    axios
      .get("http://localhost:8080/chess/elo")
      .then(res => setElos(res.data || []))
      .catch(err => console.error(err));
  }, []);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/chess/elo",
        {
          ...form,
          eloRating: Number(form.eloRating),
          worldRank: Number(form.worldRank)
        }
      );
      setElos([...elos, res.data]);
      closeForm();
    } catch {
      alert("Error adding ELO player");
    }
  };

  const handleEdit = (p) => {
    setEditId(p.playerId);
    setForm({
      playerName: p.playerName,
      nationality: p.nationality,
      eloRating: p.eloRating,
      worldRank: p.worldRank,
      title: p.title,
      active: p.active
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/chess/elo/${editId}`,
        {
          ...form,
          eloRating: Number(form.eloRating),
          worldRank: Number(form.worldRank)
        }
      );

      setElos(
        elos.map(p =>
          p.playerId === editId ? res.data : p
        )
      );

      closeForm();
    } catch {
      alert("Error updating ELO player");
    }
  };

  const handleRemove = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/chess/elo/${deleteId}`
      );

      setElos(elos.filter(p => p.playerId !== deleteId));
      setShowConfirm(false);
      setDeleteId(null);
    } catch {
      alert("Error deleting ELO player");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
    setForm({
      playerName: "",
      nationality: "",
      eloRating: "",
      worldRank: "",
      title: "",
      active: true
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
            Add ELO +
          </button>
        </nav>
      </header>

      <main className="main-content">
        <h1 className="region-title">Chess ELO Database</h1>
      </main>

      {/* TABLE */}
      <section className="tournament-results">
        <div className="results-section">
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Nation</th>
                <th>ELO</th>
                <th>Rank</th>
                <th>Title</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {elos.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No ELO data found.
                  </td>
                </tr>
              ) : (
                elos.map(p => (
                  <tr key={p.playerId}>
                    <td>{p.playerId}</td>
                    <td>{p.playerName}</td>
                    <td>{p.nationality}</td>
                    <td>{p.eloRating}</td>
                    <td>{p.worldRank}</td>
                    <td>{p.title}</td>
                    <td>{p.active ? "Yes" : "No"}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(p.playerId)}
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
            <h2>{isEditing ? "Edit ELO" : "Add ELO"}</h2>

            <div className="form-group">
              <label>Name</label>
              <input name="playerName" value={form.playerName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Nationality</label>
              <input name="nationality" value={form.nationality} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>ELO Rating</label>
              <input type="number" name="eloRating" value={form.eloRating} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>World Rank</label>
              <input type="number" name="worldRank" value={form.worldRank} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Title</label>
              <input name="title" value={form.title} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                />
                &nbsp; Active
              </label>
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

      {/* DELETE CONFIRM */}
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

export default ChessEloBE;
