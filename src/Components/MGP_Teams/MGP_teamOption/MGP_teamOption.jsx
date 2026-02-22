import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MGP_teamOption.css";

const MGP_teamOption = ({ theme }) => {
  const [category, setCategory] = useState("MotoGP");
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/team")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch teams");
        return res.json();
      })
      .then((data) => setTeams(data))
      .catch((err) => console.error("Fetch team error:", err));
  }, []);

  const filteredTeams = teams.filter(
    (team) => team.tCategory === category
  );

  return (
    <>
      {/* Category Buttons */}
      <div className="TO_categories">
        {["MotoGP", "Moto2", "Moto3", "MotoE"].map((cat) => (
          <button
            key={cat}
            className={`TO_category_button ${
              category === cat ? "TO_active" : ""
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Team Cards */}
      <div className="TO_teamOption_container">
        {filteredTeams.map((team) => (
          <div
            key={team.tId}
            className="TO_teamOption_card"
            onClick={() => navigate(`/MGP_Teams/${team.tId}`)}
          >
            <img
              src={team.tLogo}
              alt={team.tName}
            />
            <div className="TO_teamOption_cardLabel">
              {team.tName}
            </div>
          </div>
        ))}

        {filteredTeams.length === 0 && (
          <p style={{ textAlign: "center" }}>
            No teams available
          </p>
        )}
      </div>
    </>
  );
};

export default MGP_teamOption;
