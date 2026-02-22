import React, { useState, useEffect } from "react";
import "./PUBGToursPage.css";
import axios from "axios";
import mlbbBanner from "../../assets/images/pubgmnew.png";

const PUBGToursPage = ({theme}) => {
    const [tourData, setTourData] = useState([]);
    const [selectedTier, setSelectedTier] = useState("All");

    useEffect (() => {
        if (selectedTier === "All") {
            axios
            .get("http://localhost:8080/pubg_tours")
            .then((res) => setTourData(res.data));
        } else {
            axios
            .get(`http://localhost:8080/pubg_tours/tier/${selectedTier}`)
            .then((res) => setTourData(res.data));
        }
    }, [selectedTier]);


    return (
        <div className={`pubg-tour ${theme}`}>

            {/* HEADER */}
            <header className="header">
                <img src={mlbbBanner} alt="Mobile Legends" className="header-logo" />
                <nav className="nav-tabs">
                {["Recent", "S", "A", "B", "C", "Q", "Other", "All"].map(
                    (tier) => (
                    <button key={tier} className="nav-btn" onClick={() => setSelectedTier(tier)}>
                        {tier}
                    </button>
                    )
                )}
                </nav>
            </header>

            {/* MAIN CONTENT */}
            <main className="main-content">
                <h1 className="region-title">Tournaments - {selectedTier}</h1>
            </main>

            {/* RECENT TOURS */}
            <section className="tournament-results">


            <div className="results-section">
                <h3 className="results-subtitle">Recent Tournaments</h3>
                <table className="results-table">
                <thead>
                    <tr>
                    <th>Tier</th>
                    <th>Tournament</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Prizepool</th>
                    </tr>
                </thead>
                <tbody>
                    {tourData.map((row) => (
                    <tr key={row.id}>
                        <td>{row.tourTier}</td>
                        <td>
                            <div className="team-cell">
                            <img src={row.tourLogo} alt={row.tourName} className="team-icon" />
                            <span>{row.tourName}</span>
                            </div>
                        </td>
                        <td>{row.tourLocation}</td>
                        <td>{row.tourDates}</td>
                        <td>{row.tourPrizePool}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </section>
        </div>
    );
};

export default PUBGToursPage;