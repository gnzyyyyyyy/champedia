import React, { useState, useEffect, use } from "react";
import axios from "axios";
import "./Mplid.css";




// === Indonesia Logos ===
import bigetron from "../../assets/images/mlbb_teams/bigetron.png";
import alterego from "../../assets/images/mlbb_teams/alterego.png";
import onic from "../../assets/images/mlbb_teams/onic.png";
import rrq from "../../assets/images/mlbb_teams/rrq.png";
import evos from "../../assets/images/mlbb_teams/evos.png";
import navi from "../../assets/images/mlbb_teams/navi.png";
import geekfam from "../../assets/images/mlbb_teams/geekfam.png";
import teamliquidid from "../../assets/images/mlbb_teams/teamliquid.png";
import dewaunited from "../../assets/images/mlbb_teams/dewaunited.png";
import paparrex from "../../assets/images/mlbb_teams/prx.png";

// === Heroes ===
import eudoraImg from "../../assets/images/heroes/eudora.png";
import esmeraldaImg from "../../assets/images/heroes/esmeralda.png";
import xborgIMG from "../../assets/images/heroes/xborg.png";
import terizlaIMG from "../../assets/images/heroes/terizla.png";
import zilongIMG from "../../assets/images/heroes/zilong.png";
import lingIMG from "../../assets/images/heroes/ling.png";
import atlasIMG from "../../assets/images/heroes/atlas.png";
import astraIMG  from "../../assets/images/heroes/astra.png";

// === Header Banner ===
import mlbbBanner from "../../assets/images/mplid.png";




// === DATABASES ===
const leagueInformation = [
    { about: "Series", detail: "MPL Indonesia" },
    { about: "Organizer", detail: ["Moonton", "Mineski"] },
    { about: "Sponsors", detail: ["Samsung", "Telkomsel Simpati", "Gopay", "Dunia Games", "Good Day"]},
    { about: "Official Devices", detail: "Samsung S25 Ultra"},
    { about: "Patch", detail: "1.9.99 – 2.1.18"},
    { about: "type", detail: "Offline"},
    { about: "Venue", detail: ["Regular Season: XO Hall", "PlayOffs: NICE PIK2"]},
    { about: "Prize Pool", detail: "Rp 4.860.000.000 IDR"},
    { about: "start date", detail: "October 10, 2025"},
    { about: "end date", detail: "November 2, 2025"}
]


const standingsData = [
  { rank: "#1", team: "Onic Esports", logo: onic, match: "Tes", game: "Tes", diff: "Tes" },
  { rank: "#2", team: "Alter Ego", logo: alterego, match: "Tes", game: "Tes", diff: "Tes" },
  { rank: "#3", team: "Bigetron", logo: bigetron, match: "Tes", game: "Tes", diff: "Tes" },
  { rank: "#4", team: "Dewa United", logo: dewaunited, match: "Tes", game: "Tes", diff: "Tes" },
  { rank: "#5", team: "Natus Vincere", logo: navi, match: "Tes", game: "Tes", diff: "Tes" },
  { rank: "#6", team: "Team Liquid ID", logo: teamliquidid, match: "Tes", game: "Tes", diff: "Tes" },
  { rank: "#7", team: "RRQ Hoshi", logo: rrq, match: "Tes", game: "Tes", diff: "Tes" },
  { rank: "#8", team: "Geek Fam ID", logo: geekfam, match: "Tes", game: "Tes", diff: "Tes" },
  { rank: "#9", team: "Evos Meong", logo: evos, match: "Tes", game: "Tes", diff: "Tes" },
];


const heroStatistic = [
    { number: "1",  hero: "Zilong", heroImg: zilongIMG, picks: 1000,  ban: 500, win: 900, loss: 100, winRate: "90%"  },
    { number: "2",  hero: "Eudora", heroImg: eudoraImg, picks: 200,  ban: 100, win: 50, loss: 150, winRate: "33%"  },
    { number: "3",  hero: "Esmeralda", heroImg: esmeraldaImg, picks: 1000,  ban: 500, win: 900, loss: 100, winRate: "90%"  },
    { number: "4",  hero: "Xborg", heroImg: xborgIMG, picks: 1000,  ban: 500, win: 900, loss: 100, winRate: "90%"  },
    { number: "5",  hero: "Terizla", heroImg: terizlaIMG, picks: 1000,  ban: 500, win: 900, loss: 100, winRate: "90%"  },
]




const Mplid = ({ theme }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/mlbb_teams/country/Indonesia")
      .then((res) => setTeams(res.data));
  })
  return (
    <div className={`teams-page ${theme}`}>
        {/* Header */}
        <header className="header">
            <img src={mlbbBanner} alt="MPL Indonesia" className="header-logo" />
        </header>

        {/* Main Content */}
        <main className="main-content">
            <h1 className="region-title">MPL Indonesia Season 16</h1>

        {/* Tournament Overview */}
        <section className="tournament-overview">
        <h2 className="country-title">Tournament Overview</h2>
        <div className="overview-box">
            <p>Matches from Week 5 onwards will be played with Annual Map Change</p>
            <p><strong>Regular Season:</strong> August 22nd - October 19th, 2025</p>
            <ul>
                <li>Double Round Robin</li>
                <li>All Matches are Bo3</li>
                <li>Earn 1 point for each match win</li>
                <li>Earn 0 point for each match lose</li>
                <li>Top 6 teams will advance to playoffs</li>
            </ul>
            <p><strong>Playoffs:</strong> October 29th - November 2nd, 2025</p>
            <ul>
                <li>Hybrid elimination</li>
                <li>3rd to 6th seeded teams compete in Round 1 (Single elimination)</li>
                <li>1st and 2nd seeded teams receive a round bye and will start in Round 2 (Double elimination)</li>
                <li>All matches (excl. Lower Bracket Final & Grand Final) are Bo5</li>
                <li>Lower Bracket Final & Grand Final are Bo7</li>
                <li>Top 2 qualifies to M7 World Championship</li>
            </ul>
            
            <div className="results-section">
                <p><strong>League</strong> Information</p>
                <table className="results-table">
                    <tbody>
                    {leagueInformation.map((row) => (
                        <tr key={row.about}>
                        <td>{row.about}</td>
                        <td>
                            {Array.isArray(row.detail)
                            ? row.detail.map((item, index) => (
                                <div key={index}>{item}</div>
                                ))
                            : row.detail}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </section>

        {/* Participating Teams */}
        <section className="country-section">
          <h2 className="country-title">Participating Teams</h2>
          <div className="team-grid">
            {teams.map((team) => (
              <div key={team.id} className="team-card">
                <img src={team.teamLogo} alt={team.teamame} className="team-logo" />
                <p className="team-name">{team.teamName}</p>
              </div>
            ))}
          </div>
        </section>

            {/* Tournament Results */}
            <section className="tournament-results">
            <h2 className="country-title">Tournament Results</h2>

            <div className="results-section">
                <h3 className="results-subtitle">Final Standings</h3>
                <table className="results-table">
                <thead>
                    <tr>
                    <th>Ranks</th>
                    <th>Team Names</th>
                    <th>Match</th>
                    <th>Game</th>
                    <th>Diff</th>
                    </tr>
                </thead>
                <tbody>
                    {standingsData.map((row) => (
                    <tr key={row.rank}>
                        <td>{row.rank}</td>
                        <td>
                            <div className="team-cell">
                            <img src={row.logo} alt={row.team} className="team-icon" />
                            <span>{row.team}</span>
                            </div>
                        </td>
                        <td>{row.match}</td>
                        <td>{row.game}</td>
                        <td>{row.diff}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </section>

        {/* Hero Statistics */}
        <section className="tournament-results">
          <h2 className="country-title">Hero Statistics</h2>

          <div className="results-section">
            <h3 className="results-subtitle">Top 5 Most Picks</h3>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Hero</th>
                  <th>Picks</th>
                  <th>Ban</th>
                  <th>Win</th>
                  <th>Loss</th>
                  <th>WinRate</th>
                </tr>
              </thead>
              <tbody>   
                {heroStatistic.map((row) => (
                    <tr key={row.number}>
                    <td>{row.number}</td>
                    <td>
                        <div className="hero-cell">
                        <img src={row.heroImg} alt={row.hero} className="hero-icon" />
                        <span>{row.hero}</span>
                        </div>
                    </td>
                    <td>{row.picks}</td>
                    <td>{row.ban}</td>
                    <td>{row.win}</td>
                    <td>{row.loss}</td>
                    <td>{row.winRate}</td>
                    </tr>
                ))}
                </tbody>

            </table>
          </div>
        </section>
      </main> 
    </div>
  );
};

export default Mplid;