import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./BDM_Players-BE-Page.css";

import mlbbBanner from "../../assets/images/BDM_Page/banner.png";

const BadmintonPlayersBE = ({ theme }) => {

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
    playerName: "",
    playerNationality: "",
    playerAge: "",
    playerRanking: ""
  });

  /* =========================
     FETCH PLAYERS
  ========================= */
  useEffect(() => {
    axios
      .get("http://localhost:8080/badminton/players")
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
        "http://localhost:8080/badminton/players",
        {
          ...newPlayer,
          playerAge: Number(newPlayer.playerAge),
          playerRanking: Number(newPlayer.playerRanking)
        }
      );

      setPlayers([...players, res.data]);
      closeForm();
    } catch (err) {
      alert("Error adding player");
    }
  };

  const handleEdit = (player) => {
    setEditPlayerId(player.playerId);
    setNewPlayer({
      playerName: player.playerName,
      playerNationality: player.playerNationality,
      playerAge: player.playerAge,
      playerRanking: player.playerRanking
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdatePlayer = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/badminton/players/${editPlayerId}`,
        {
          ...newPlayer,
          playerAge: Number(newPlayer.playerAge),
          playerRanking: Number(newPlayer.playerRanking)
        }
      );

      setPlayers(
        players.map((p) =>
          p.playerId === editPlayerId ? res.data : p
        )
      );

      closeForm();
    } catch (err) {
      alert("Error updating player");
    }
  };

  const handleRemove = (id) => {
    setPlayerToDelete(id);
    setShowConfirmation(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/badminton/players/${playerToDelete}`
      );

      setPlayers(players.filter(p => p.playerId !== playerToDelete));
      setShowConfirmation(false);
      setPlayerToDelete(null);
    } catch (err) {
      alert("Error deleting player");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditPlayerId(null);

    setNewPlayer({
      playerName: "",
      playerNationality: "",
      playerAge: "",
      playerRanking: ""
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
        <h1 className="region-title">Badminton Players Database</h1>
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
                <th>Age</th>
                <th>Ranking</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {players.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No players found.
                  </td>
                </tr>
              ) : (
                players.map((p) => (
                  <tr key={p.playerId}>
                    <td>{p.playerId}</td>
                    <td>{p.playerName}</td>
                    <td>{p.playerNationality}</td>
                    <td>{p.playerAge}</td>
                    <td>{p.playerRanking}</td>
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
              <input name="playerName" value={newPlayer.playerName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Nationality:</label>
              <input name="playerNationality" value={newPlayer.playerNationality} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Age:</label>
              <input type="number" name="playerAge" value={newPlayer.playerAge} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Ranking:</label>
              <input type="number" name="playerRanking" value={newPlayer.playerRanking} onChange={handleChange} />
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

export default BadmintonPlayersBE;
