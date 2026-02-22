import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ValoTeams.css";
import valoBanner from "../../assets/images/valo_logo.png";

const TeamsPage = ({ theme }) => {
  const [grouped, setGrouped] = useState({});
  const [selectedRegion, setSelectedRegion] = useState("All");

  useEffect(() => {
    if (selectedRegion === "All") {
      axios
        .get("http://localhost:8080/valo_teams")
        .then((res) => groupTeamsByCountry(res.data))
    } else {
      axios
        .get(`http://localhost:8080/valo_teams/region/${selectedRegion}`)
        .then((res) => groupTeamsByCountry(res.data))
    }
  }, [selectedRegion]);

  const groupTeamsByCountry = (teams) => {
    const grouped = teams.reduce((acc, team) => {
      const country = team.teamCountry;
      if (!acc[country]) {
        acc[country] = [];
      }
      acc[country].push(team);
      return acc;
    }, {});

    setGrouped(grouped);
  };


  return (
    <div className={`teams-page ${theme}`}>
      {/* Header */}
      <header className="header">
        <img src={valoBanner} alt="Mobile Legends" className="header-logo" />
        <nav className="nav-tabs">
          {["APAC", "EMEA", "AMER", "China", "All"].map(
            (region) => (
              <button key={region} className={`nav-btn ${selectedRegion === region ? "active" : ""}`} onClick={() => setSelectedRegion(region)}>
                {region}
              </button>
            )
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="region-title">{selectedRegion}</h1>

        {Object.keys(grouped).map((country) => (
          <section key={country} className="country-section">
            <h2 className="country-title">{country}</h2>

            <div className="team-grid">
              {grouped[country].map((team) => (
                <div key={team.id} className="team-card">
                  <img src={team.teamLogo} alt={team.teamName} className="team-logo" />
                  <p className="teamName">{team.teamName}</p>

                  {/* Hover panel */}
                  <div className="player-popup">
                    <h4>{team.teamName}</h4>
                    <table className="player-table">
                      <tbody>
                        {team.players?.map((player, index) => (
                        <tr key={index}>
                          <td className="flag">🇮🇩</td>
                          <td className="player-name">{player.name}</td>
                          <td className="role">{player.role}</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default TeamsPage;
