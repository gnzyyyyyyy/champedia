import React from "react";
import "./Esport.css";
import { useNavigate } from "react-router-dom";

import valorantImage from "../../../assets/images/valorant.png";
import mlbbImage from "../../../assets/images/mlbb.png";
import pubgImage from "../../../assets/images/pubgm.png";
import crImage from "../../../assets/images/cr.png";

export const EsportChoices = ({ theme }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (id === 1) {
      navigate("/valo");
    }
    if (id === 2) {
      navigate("/mlbb");
    }
    if (id === 3) {
      navigate("/pubg");
    }
    if (id === 4) {
      navigate("/cr");
    }
  };

  const esports = [
    { id: 1, name: "Valorant" },
    { id: 2, name: "Mobile Legends: Bang Bang" },
    { id: 3, name: "PUBG Mobile" },
    { id: 4, name: "Clash Royale" },
  ];

  const images = {
    1: valorantImage,
    2: mlbbImage,
    3: pubgImage,
    4: crImage,
  };

  return (
    <div className={`esport-choices ${theme}`}>
      <div className="line" />
      <h2 className="section-title">E-Sports</h2>

      <div className="esport-list">
        {esports.map((esport) => (
          <div
            key={esport.id}
            className="esport-item"
            onClick={() => handleClick(esport.id)}
          >
            <div className="image-e-sport">
              <img src={images[esport.id]} alt={esport.name} />
            </div>
            <div className="esport-name">{esport.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EsportChoices;
