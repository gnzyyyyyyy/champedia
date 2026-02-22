import React from "react";
import "./OGT_PUBG.css";
import { useNavigate } from "react-router-dom";

import mplPH from "../../../assets/images/PMSLPUBG.png";
import mplID from "../../../assets/images/PMGCPUBG.png";
import mplMY from "../../../assets/images/PMWCPUBG.png";
import mplSG from "../../../assets/images/PMGOPUBG.png";

const OGT_PUBG = () => {
  const navigate = useNavigate();

  const tournaments = [
    { name: "MPL Philippines", img: mplPH },
    { name: "MPL Indonesia", img: mplID, path: "/Mplid" },
    { name: "MPL Malaysia", img: mplMY },
    { name: "MPL Singapore", img: mplSG },
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

export default OGT_PUBG;