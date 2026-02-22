import React from "react";
import "./Sport.css";
import { useNavigate } from "react-router-dom";

import chessImage from "../../../assets/images/Chess_Page/Thomas-Chess-World-Championship.webp";
import motogpImage from "../../../assets/images/motogp.png";
import f1Image from "../../../assets/images/f1.png";
import badmintonImage from "../../../assets/images/badminton.png";

export const SportChoicesBackEnd = ({ theme }) => {

    const navigate = useNavigate();
  
    const handleClick = (id) => {
      if (id === 1) {
        navigate("/mgp_admin");
      }
      if (id === 2) {
        navigate("/f1_admin");
      }
      if (id === 3) {
        navigate("/badminton_BE");
      }
      if (id === 4) {
        navigate("/chess_BE");
      }
    };
  const sports = [
    { id: 1, name: "MotoGP", image: "" },
    { id: 2, name: "Formula 1", image: "" },
    { id: 3, name: "Badminton", image: "" },
    { id: 4, name: "Chess", image: "" },
  ];

  const images = {
    1: motogpImage,
    2: f1Image,
    3: badmintonImage,
    4: chessImage,
  };

  return (
    <div className={`sport-choices ${theme}`}>
      <div className="line" />
      <h2 className="section-title">Sports</h2>
      
      <div className="sport-list">
        {sports.map((sport) => (
          <div key={sport.id} className="sport-item" onClick={() => handleClick(sport.id)}>
            <div className="image-sport">
                <img src={images[sport.id]} alt={sport.name} />
            </div>
            <div className="sport-name">{sport.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportChoicesBackEnd;