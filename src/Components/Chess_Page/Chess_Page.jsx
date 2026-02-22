import React from "react";
import { useNavigate } from "react-router-dom";
import "./Chess_Page.css";

import playersImg from "../../assets/images/Chess_Page/Thomas-Chess-World-Championship.webp";
import tournamentImg from "../../assets/images/Chess_Page/WC-2025.jpg";
import eloImg from "../../assets/images/Chess_Page/chess_rating_f651e760-84e7-427c-bbdf-fcfe3a781cfd.webp";

const items = [
  { id: 1, name: "Players", path: "/chess/players", image: playersImg },
  { id: 2, name: "Tournaments", path: "/chess/tournaments", image: tournamentImg },
  { id: 3, name: "ELO Ranking", path: "/chess/elo", image: eloImg }
];

const Chess_Base = ({ theme }) => {
  const navigate = useNavigate();

  return (
    <div className={`chess-base ${theme}`}>
      <h1 className="page-title">Chess</h1>

      <div className="card-grid">
        {items.map(item => (
          <div
            key={item.id}
            className="card"
            onClick={() => navigate(item.path)}
          >
            <img src={item.image} alt={item.name} />
            <div className="label">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chess_Base;
