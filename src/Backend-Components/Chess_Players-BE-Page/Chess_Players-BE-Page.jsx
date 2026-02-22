import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./Chess_Players-BE-Page.css"; 
// ⬆️ pake CSS yang sama biar konsisten

import mlbbBanner from "../../assets/images/Chess_Page/chess_banner.png";

const ChessPlayersBE = ({ theme }) => {

  /* =========================
     STATE
  ========================= */
  const [players, setPlayers] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editPlayerId, setEditPlayerId] = useState(null);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);

  const [newPlayer, setNewPlayer] = useState({
    name: "",
    nationality: "",
    rating: "",
    title: "",
    age: ""
  });

  /* =========================
     FETCH PLAYERS
  ========================= */
  useEffect(() => {
    axios
      .get("http://localhost:8080/chess/players")
      .then((res) => setPlayers(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer({ ...newPlayer, [name]: value });
  };

  const handleAddPlayer = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/chess/players",
        {
          ...newPlayer,
          rating: Number(newPlayer.rating),
          age: Number(newPlayer.age)
        }
      );

      setPlayers([...players, res.data]);
      closeForm();
    } catch (err) {
      alert("Error adding chess player");
    }
  };

  const handleEdit = (player) => {
    setEditPlayerId(player.playerId);
    setNewPlayer({
      name: player.name,
      nationality: player.nationality,
      rating: player.rating,
      title: player.title,
      age: player.age
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdatePlayer = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/chess/players/${editPlayerId}`,
        {
          ...newPlayer,
          rating: Number(newPlayer.rating),
          age: Number(newPlayer.age)
        }
      );

      setPlayers(
        players.map((p) =>
          p.playerId === editPlayerId ? res.data : p
        )
      );

      closeForm();
    } catch (err) {
      alert("Error updating chess player");
    }
  };

  const handleRemove = (id) => {
    setPlayerToDelete(id);
    setShowConfirmation(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/chess/players/${playerToDelete}`
      );

      setPlayers(players.filter(p => p.playerId !== playerToDelete));
      setShowConfirmation(false);
      setPlayerToDelete(null);
    } catch (err) {
      alert("Error deleting chess player");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditPlayerId(null);

    setNewPlayer({
      name: "",
      nationality: "",
      rating: "",
      title: "",
      age: ""
    });
  };

  /* =========================
     JSX
  ========================= */
  return (
    <div className={`teams-page ${theme}`}>
      {/* HEADER */}
      <header className="header">
        <img src={mlbbBanner} alt="Banner" className="header-logo" />
        <nav className="nav-tabs">
          <button className="nav-btn" onClick={() => setShowForm(true)}>
            Add Player +
          </button>
        </nav>
      </header>

      <main className="main-content">
        <h1 className="region-title">Chess Players Database</h1>
      </main>

      {/* TABLE */}
      <section className="tournament-results">
        <div className="results-section">
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Nationality</th>
                <th>Rating</th>
                <th>Title</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {players.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No players found.
                  </td>
                </tr>
              ) : (
                players.map((p) => (
                  <tr key={p.playerId}>
                    <td>{p.playerId}</td>
                    <td>{p.name}</td>
                    <td>{p.nationality}</td>
                    <td>{p.rating}</td>
                    <td>{p.title}</td>
                    <td>{p.age}</td>
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
            <h2>{isEditing ? "Edit Player" : "Add New Player"}</h2>

            <div className="form-group">
              <label>Name:</label>
              <input name="name" value={newPlayer.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Nationality:</label>
              <input name="nationality" value={newPlayer.nationality} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Rating:</label>
              <input type="number" name="rating" value={newPlayer.rating} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Title:</label>
              <input name="title" value={newPlayer.title} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Age:</label>
              <input type="number" name="age" value={newPlayer.age} onChange={handleChange} />
            </div>

            <div className="modal-actions">
              <button
                className="add-btn"
                onClick={isEditing ? handleUpdatePlayer : handleAddPlayer}
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

export default ChessPlayersBE;
