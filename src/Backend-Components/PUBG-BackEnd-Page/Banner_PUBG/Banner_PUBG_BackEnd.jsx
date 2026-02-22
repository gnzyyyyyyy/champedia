import React from "react";
import "./Banner_PUBG_BackEnd.css";
import { useNavigate } from "react-router-dom";

import mlbbBanner from "../../../assets/images/PMGCBanner.png";
import teamsImg from "../../../assets/images/teamsPUBG.webp";
import playersImg from "../../../assets/images/playerPUBG.jpg";
import tournamentsImg from "../../../assets/images/PUBGTournament.jpg";
import heroesImg from "../../../assets/images/PUBGMaps.jpg";
import equipmentsImg from "../../../assets/images/mlbb_equipments.png";
import patchesImg from "../../../assets/images/PatchUpdatePUBG.jpg";

const items = [
  { id: 1, name: "Teams", image: teamsImg, path: "/pubg_teams_BE" },
  { id: 2, name: "Players", image: playersImg, path: "/pubg_players_BE" },
  { id: 3, name: "Tournaments", image: tournamentsImg, path: "/pubg_tours_BE" },
  { id: 4, name: "Maps", image: heroesImg, path: "/pubg_maps_BE" },
  { id: 5, name: "Patches and Updates", image: patchesImg, path: "/pubg_patches_BE" },
];

const BannerPUBG_BackEnd = ({ theme }) => {
  const navigate = useNavigate();
  return (
    <div className={`bannerMl ${theme}`}>

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

export default BannerPUBG_BackEnd;
