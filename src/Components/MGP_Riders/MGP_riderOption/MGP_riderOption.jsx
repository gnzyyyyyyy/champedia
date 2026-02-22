import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MGP_riderOption.css";

const MGP_riderOption = () => {
  const [category, setCategory] = useState("MotoGP");
  const [riders, setRiders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/rider")
      .then((res) => res.json())
      .then((data) => setRiders(data))
      .catch((err) => console.error("Fetch rider error:", err));
  }, []);

  const filteredRiders = riders.filter(
    (rider) => rider.rCategory === category
  );

  return (
    <>
      {/* Category Buttons */}
      <div className="RO_categories">
        {["MotoGP", "Moto2", "Moto3", "MotoE"].map((cat) => (
          <button
            key={cat}
            className={`RO_category_button ${
              category === cat ? "active" : ""
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rider Cards */}
      <div className="RO_riderOption_container">
        {filteredRiders.map((rider) => (
          <div
            key={rider.rId}
            className="RO_riderOption_card"
            onClick={() => navigate(`/MGP_Riders/${rider.rId}`)}
          >
            {rider.rPhoto ? (
              <img
                src={rider.rPhoto}
                alt={rider.rName}
              />
            ) : (
              <div className="RO_riderOption_noImage">
                No Image
              </div>
            )}

            <div className="RO_riderOption_cardLabel">
              {rider.rName}
            </div>
          </div>
        ))}

        {filteredRiders.length === 0 && (
          <p style={{ textAlign: "center" }}>
            No riders available
          </p>
        )}
      </div>
    </>
  );
};

export default MGP_riderOption;
