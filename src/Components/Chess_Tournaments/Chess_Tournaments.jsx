import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Chess_Tournaments.css";

const Chess_Tournaments = ({ theme }) => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/chess/tournaments")
      .then(res => setTournaments(res.data || []));
  }, []);

  return (
    <div className={`chess-table-page ${theme}`}>
      <h1>Chess Tournaments</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Category</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map(t => (
            <tr key={t.tournamentId}>
              <td>{t.name}</td>
              <td>{t.location}</td>
              <td>{t.category}</td>
              <td>{t.startDate}</td>
              <td>{t.endDate}</td>
              <td>
                <span className={`status ${t.status}`}>
                  {t.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Chess_Tournaments;
