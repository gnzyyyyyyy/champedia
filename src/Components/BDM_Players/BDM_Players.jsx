import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BDM_Players.css";

const BadmintonPlayers = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/badminton/players")
      .then(res => setPlayers(res.data || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="players-page">
      <h1>Badminton Players</h1>

      <div className="players-grid">
        {players.map(p => (
          <div className="player-card" key={p.playerId}>
            <div className="avatar">
              {p.playerName?.substring(0, 2).toUpperCase()}
            </div>

            <h3>{p.playerName}</h3>
            <p>{p.playerNationality}</p>
            <span>Rank #{p.playerRanking}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadmintonPlayers;
