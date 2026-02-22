import React from "react";
import "./OGT_CR.css";
import { useNavigate } from "react-router-dom";

import mplPH from "../../../assets/images/mplph.png";
import mplID from "../../../assets/images/mplid.png";
import mplMY from "../../../assets/images/mplmy.png";
import mplSG from "../../../assets/images/mplsg.png";

import crtur1 from "../../../assets/images/crtur1.png";
import crtur2 from "../../../assets/images/crtur2.png";



const OGT_CR = () => {
  const navigate = useNavigate();

  const tournaments = [
    { name: "MPL Philippines", img: crtur1 },
    { name: "MPL Indonesia", img: crtur2, path: "/Mplid" },
  ];

  return (
    <section className="ongoing-section">
      <div className="line" />
      <h2 className="ongoing-title">On Going Tournaments</h2>

      <div className="ongoing-logos">
        {tournaments.map((t, index) => (
          <img
            key={index}
            src={t.img}
            alt={t.name}
            onClick={() => t.path && navigate(t.path)}
            style={{ cursor: t.path ? "pointer" : "default" }}
          />
        ))}
      </div>
    </section>
  );
};

export default OGT_CR;