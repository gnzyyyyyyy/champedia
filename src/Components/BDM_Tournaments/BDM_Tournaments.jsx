import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BDM_Tournament.css";

const BDM_Tournaments = ({ theme }) => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/badminton/tournaments")
      .then((res) => setTournaments(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={`bdm-tournament-page ${theme}`}>
      <h1 className="bdm-title">Badminton Tournaments</h1>

      <div className="table-wrapper">
        <table className="bdm-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {tournaments.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty">
                  No tournaments found
                </td>
              </tr>
            ) : (
              tournaments.map((t) => (
                <tr key={t.tournamentId || t._id}>
                  <td className="name">{t.name}</td>
                  <td>{t.category}</td>
                  <td>{t.location}</td>
                  <td>{t.startDate}</td>
                  <td>{t.endDate}</td>
                  <td>
                    <span className={`status ${t.status}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BDM_Tournaments;
