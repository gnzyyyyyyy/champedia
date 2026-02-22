import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Chess_ELO.css";

const Chess_Elo = ({ theme }) => {
  const [elo, setElo] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/chess/elo")
      .then(res => setElo(res.data || []));
  }, []);

  return (
    <div className={`chess-table-page ${theme}`}>
      <h1>Chess ELO Rankings</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Nationality</th>
            <th>ELO</th>
            <th>World Rank</th>
            <th>Title</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {elo.map(p => (
            <tr key={p.eloId}>
              <td>{p.playerName}</td>
              <td>{p.nationality}</td>
              <td>{p.eloRating}</td>
              <td>{p.worldRank}</td>
              <td>{p.title}</td>
              <td>{p.active ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Chess_Elo;
