import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Chess_Players.css";

const Chess_Players = ({ theme }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/chess/players")
      .then(res => setPlayers(res.data || []));
  }, []);

  return (
    <div className={`chess-players ${theme}`}>
      <h1>Chess Players</h1>

      <div className="player-grid">
        {players.map(p => (
          <div key={p.playerId} className="player-card">
            <div className="avatar">
              {p.name.charAt(0)}
            </div>
            <h3>{p.name}</h3>
            <p>{p.nationality}</p>
            <span className="rating">Rating {p.rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chess_Players;
