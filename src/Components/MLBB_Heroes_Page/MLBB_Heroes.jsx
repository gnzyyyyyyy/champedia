import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MLBB_Heroes.css";
import mlbbBanner from "../../assets/images/mlbb_teams/mlbb_banner.png";


const MLBB_Heroes = () => {
    const [heroes, setHeroes] = useState([]);
    const [selectedRole, setSelectedRole] = useState("All");

    useEffect(() => {
        if(selectedRole === "All") {
        axios.get("http://localhost:8080/mlbb_heroes")
            .then(res => setHeroes(res.data))
        } else {
        axios.get(`http://localhost:8080/mlbb_heroes/role/${selectedRole}`)
            .then(res => setHeroes(res.data))
        }
    });

    return (
        <div className="heroes-page">
        {/* Header */}
            <header className="header">
                <img src={mlbbBanner} alt="Mobile Legends" className="header-logo" />
                <nav className="nav-tabs">
                    {["All", "Assassin", "Fighter", "Mage", "Marksman", "Tank", "Support"].map((role) => (
                        <button
                            key={role}
                            className={`nav-btn ${selectedRole === role ? "active" : ""}`}
                            onClick={() => setSelectedRole(role)}
                        >
                            {role}
                        </button>
                    ))}
                </nav>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <h1 className="region-title">Mobile Legends Heroes - {selectedRole}</h1>
                </main>

                {/* Card Listing */}
                <section className="heroes-grid">
                    {heroes.length > 0 ? (
                        heroes.map((hero) => (
                            <div key={hero.id} className="hero-card">
                                <img
                                    src={hero.heroImages}
                                    alt={hero.heroName}
                                    className="hero-card-image"
                                />
                                <div className="hero-card-body">
                                    <h3>{hero.heroName}</h3>
                                    <p className="hero-role">{hero.heroRole}</p>
                                    <p className="hero-name">{hero.heroName}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-data">No heroes found.</p>
                    )}
                </section>
        </div>
  );
};

export default MLBB_Heroes;