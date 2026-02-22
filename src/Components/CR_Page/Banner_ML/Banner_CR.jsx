import React from "react";
import "./Banner_CR.css";
import { useNavigate } from "react-router-dom";

import crLogo from "../../../assets/images/cr_banner2.png";
import teamsImg from "../../../assets/images/cr_team.png";
import playersImg from "../../../assets/images/cr_player.png";
import tournamentsImg from "../../../assets/images/cr_tour.png";
import heroesImg from "../../../assets/images/cr_card.png";
import equipmentsImg from "../../../assets/images/cr_evo.png";
import patchesImg from "../../../assets/images/cr_hero.png";

const items = [
  { id: 1, name: "Teams", image: teamsImg, path: "/CRTeamsPage" },
  { id: 2, name: "Players", image: playersImg, path: "/CRPlayersPage" },
  { id: 3, name: "Tournaments", image: tournamentsImg, path: "/CRToursPage" },
  { id: 4, name: "Deck Cards", image: heroesImg, path: "/CRCardsPage" },
  { id: 5, name: "Evolution Cards", image: equipmentsImg, path: "/CREvoPage" },
  { id: 6, name: "Hero Cards", image: patchesImg, path: "/CRHeroPage" },
];


const BannerCR = ({ theme }) => {
  const navigate = useNavigate();
  return (
    <div className={`bannerMl ${theme}`}>
      <div className="mainBanner">
        <img src={crLogo} alt="MLBB Banner" />
      </div>

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

export default BannerCR;
