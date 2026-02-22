import React from "react";
import "./Banner_CR_BackEnd.css";
import { useNavigate } from "react-router-dom";


import teamsImg from "../../../assets/images/cr_team.png";
import playersImg from "../../../assets/images/cr_player.png";
import tournamentsImg from "../../../assets/images/cr_tour.png";
import heroesImg from "../../../assets/images/cr_card.png";
import equipmentsImg from "../../../assets/images/cr_evo.png";
import patchesImg from "../../../assets/images/cr_hero.png";

const items = [
  { id: 1, name: "Teams", image: teamsImg, path: "/cr_teams_BE" },
  { id: 2, name: "Players", image: playersImg, path: "/cr_players_BE" },
  { id: 3, name: "Tournaments", image: tournamentsImg, path: "/cr_tours_BE" },
  { id: 4, name: "Deck Cards", image: heroesImg, path: "/cr_cards_BE" },
  { id: 5, name: "Evolution Cards", image: equipmentsImg, path: "/cr_evo_BE" },
  { id: 6, name: "Hero Cards", image: patchesImg, path: "/cr_hero_BE" },
];

const BannerCR_BackEnd = ({ theme }) => {
  const navigate = useNavigate();
  return (
    <div className={`bannerCR ${theme}`}>
      <h1>Clash Royale Admin Portal</h1>

      <div className="gridContainer">
        {items.map((item) => (
          <div
            key={item.id}
            className="card"
            onClick={() => navigate(item.path)}
            >
            <img src={item.image} alt={item.name} />
            <div className="cardLabel">{item.name}</div>
        </div>
      ))}
    </div>

    </div>
  );
};

export default BannerCR_BackEnd;
