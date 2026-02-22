import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CREvoPage.css";
import crBanner from "../../assets/images/cr_logo.png";

const rarityOrder = {
  Common: 1,
  Rare: 2,
  Epic: 3,
  Legendary: 4,
  Champion: 5
};


const CREvoPage = ({ theme }) => {
  const [cards, setCards] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    if (selectedType === "All") {
      axios
        .get("http://localhost:8080/cr_evo")
        .then((res) => {
            const sortedCards = res.data.sort(
            (a, b) => rarityOrder[a.cardRarity] - rarityOrder[b.cardRarity]
            );
            setCards(sortedCards);
        })
    } else {
      axios
        .get(`http://localhost:8080/cr_evo/type/${selectedType}`)
        .then((res) => {
            const sortedCards = res.data.sort(
            (a, b) => rarityOrder[a.cardRarity] - rarityOrder[b.cardRarity]
            );
            setCards(sortedCards);
        })
        .catch(err => console.error(err));
    }
  }, [selectedType]);

  return (
    <div className={`cards-page ${theme}`}>
      {/* Header */}
      <header className="header">
        <img src={crBanner} alt="Clash Royale" className="header-logo" />
        <nav className="nav-tabs">
          {["All", "Troop", "Spell", "Building"].map((type) => (
            <button
              key={type}
              className={`nav-btn ${selectedType === type ? "active" : ""}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </nav>
      </header>

      {/* Main */}
      <main className="main-content">
        <h1 className="region-title">{selectedType} Cards</h1>

        <div className="card-grid">
          {cards.map((card) => (
            <div key={card.id} className="card-item">
              <img
                src={card.cardImages}
                alt={card.cardName}
                className="card-image"
              />
              <p className="card-name">{card.cardName}</p>

              {/* Hover Info */}
              <div className="card-hover">
                <h4>{card.cardName}</h4>
                <p className="card-desc">{card.heroDescription}</p>
                <div className="card-cost">
                  Elixir Cost: <span>{card.cardCost}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CREvoPage;
