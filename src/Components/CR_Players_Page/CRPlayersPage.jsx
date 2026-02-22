import React , { useState, useEffect } from "react";
import "./CRPlayersPage.css";
import axios from "axios";
import crBanner from "../../assets/images/cr_logo.png";

const CRPlayersPage = ({ theme }) => {
  const [playersData, setPlayersData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:8080/cr_teams")
      .then((res) => setTeams(res.data));
  }, []);

  useEffect(() => {
    if (selectedRegion === "All") {
      axios
        .get("http://localhost:8080/cr_players")
        .then((res) => {
          const sorted = [...res.data].sort((a,b) => a.playerCountry.localeCompare(b.playerCountry));
          setPlayersData(sorted);
        });
    } else {
      axios
        .get(`http://localhost:8080/cr_players/region/${selectedRegion}`)
        .then((res) => {
          const sorted = [...res.data].sort((a,b) => a.playerCountry.localeCompare(b.playerCountry));
          setPlayersData(sorted);
        });
    }
  }, [selectedRegion]);

  const getTeamName = (teamID) => {
    const team = teams.find(t => t.id === teamID);
    return team ? team.teamName : "-";
  }
  return (
    <div className={`teams-page ${theme}`}>
        <header className="header">
        <img src={crBanner} alt="Mobile Legends" className="header-logo" />
        <nav className="nav-tabs">
          {["SEA", "Asia", "EMEA", "South America", "North America", "China", "All"].map(
            (region) => (
              <button key={region} className="nav-btn" onClick={() => setSelectedRegion(region)}>
                {region}
              </button>
            )
          )}
        </nav>
      </header>

        {/* Main Content */}
        <main className="main-content">
            <h1 className="region-title">Players</h1>

        

            {/* Southeast Asia */}

            <section className="tournament-results">
            <h2 className="country-title">{selectedRegion}</h2>
            
            <div className="results-section">
                <table className="results-table1">
                <thead>
                    <tr>
                    <th>Country</th>
                    <th>In-Game Name</th>
                    <th>Real Name</th>
                    <th>Team</th>
                    </tr>
                </thead>
                <tbody> 
                    {playersData.length === 0 ? (
                    <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>No data available</td>
                    </tr>
                    ) : (
                    playersData.map((row) => (
                    <tr key={row.id}>
                        <td>
                          <div className="team-cell">
                            <img src={row.country_flag} alt={row.playerCountry} className="team-icon" />
                            <span>{row.playerCountry}</span></div></td>
                        <td>{row.playerIGN}</td>
                        <td>{row.playerName}</td>
                        <td>
                        <div className="team-cell">
                          <span>{getTeamName(row.teamID)}</span>
                        </div>
                      </td>
                    </tr>
                    ))
                    )}
                </tbody>
                </table>
            </div>
            
            </section>
      </main>
    </div>
  );
};

export default CRPlayersPage;