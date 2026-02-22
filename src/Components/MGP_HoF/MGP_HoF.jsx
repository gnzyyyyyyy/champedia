import React, { useEffect, useState } from "react";
import "./MGP_HoF.css";

const MGPHoF = () => {
  const [hofData, setHofData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCardClick = (hofID) => {
    console.log("HoF clicked:", hofID);
  };

  useEffect(() => {
    const fetchHoF = async () => {
      try {
        const res = await fetch("http://localhost:8080/MGP_HoF");
        if (!res.ok) throw new Error("Failed to fetch Hall of Fame");

        const data = await res.json();
        setHofData(data);
      } catch (err) {
        console.error("Fetch HoF error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHoF();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading Hall of Fame...</p>;
  }

  return (
    <div className="HF_mgpHof">

      {/* Title */}
      <b className="HF_hallOfFame">HALL OF FAME</b>

      {/* Cards */}
      <div className="HF_teamsParent">
        {hofData.map((item, index) => (
          <div
            key={item.hofID}
            className={`HF_teamsCard HF_teams${index}`}
            onClick={() => handleCardClick(item.hofID)}
          >
            {/* MAIN IMAGE (belum ada foto di model) */}
            <img className="HF_mainImage" alt={item.riderName} />

            <div className="HF_slidingImage">
              <img className="HF_riderIcon" alt={item.riderName} />

              <b className="HF_riderName">
                {item.riderName}
              </b>

              <div className="HF_line"></div>

              <b className="HF_yearsActive">Years Active:</b>
              <b className="HF_years">
                {item.yearsActive1} - {item.yearsActive2}
              </b>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MGPHoF;
