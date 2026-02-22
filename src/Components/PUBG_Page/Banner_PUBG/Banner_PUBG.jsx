import React from "react";
import "./Banner_PUBG.css";
import { useNavigate } from "react-router-dom";

import mlbbBanner from "../../../assets/images/PMGCBanner.png";
import teamsImg from "../../../assets/images/teamsPUBG.webp";
import playersImg from "../../../assets/images/playerPUBG.jpg";
import tournamentsImg from "../../../assets/images/PUBGTournament.jpg";
import heroesImg from "../../../assets/images/PUBGMaps.jpg";
import equipmentsImg from "../../../assets/images/mlbb_equipments.png";
import patchesImg from "../../../assets/images/PatchUpdatePUBG.jpg";

const items = [
  { id: 1, name: "Teams", image: teamsImg, path: "/PUBGTeamsPage" },
  { id: 2, name: "Players", image: playersImg, path: "/PUBGPlayersPage" },
  { id: 3, name: "Tournaments", image: tournamentsImg, path: "/PUBGToursPage" },
  { id: 4, name: "Maps", image: heroesImg, path: "/PUBGMapsPage" },
  { id: 5, name: "Patches and Updates", image: patchesImg, path: "/PUBGPatchesPage" },
];

const BannerPUBG = ({ theme }) => {
  const navigate = useNavigate();
  return (
    <div className={`bannerMl ${theme}`}>
      <div className="mainBanner">
        <img src={mlbbBanner} alt="MLBB Banner" />
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

export default BannerPUBG;
