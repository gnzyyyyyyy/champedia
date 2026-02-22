import React from "react";
import { useNavigate } from "react-router-dom";
import "./BDM_Base.css";

import playersImg from "../../assets/images/BDM_Page/licensed-image.jpeg";
import tournamentImg from "../../assets/images/BDM_Page/BD7DDFAC-145A-4865-B58A-C00977D5A3C3.png";
import equipmentImg from "../../assets/images/BDM_Page/YONEX_VOLTRIC80_3UG4-3.jpg";

const BDM_Page = ({ theme }) => {
  const navigate = useNavigate();

  return (
    <div className={`bdm-base ${theme}`}>
      <h1 className="bdm-title">Badminton</h1>

      <div className="bdm-options">
        <div className="bdm-card" onClick={() => navigate("/badminton/players")}>
          <img src={playersImg} alt="Players" />
          <span>Players</span>
        </div>

        <div className="bdm-card" onClick={() => navigate("/badminton/tournaments")}>
          <img src={tournamentImg} alt="Tournaments" />
          <span>Tournaments</span>
        </div>

        <div className="bdm-card" onClick={() => navigate("/badminton/equipment")}>
          <img src={equipmentImg} alt="Equipment" />
          <span>Equipment</span>
        </div>
      </div>
    </div>
  );
};

export default BDM_Page;
