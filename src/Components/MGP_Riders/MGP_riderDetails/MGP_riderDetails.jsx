import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MGP_riderDetails.css";

const MGP_riderDetails = () => {
  const { id } = useParams();
  const [rider, setRider] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/rider/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Rider not found");
        return res.json();
      })
      .then((data) => setRider(data))
      .catch((err) => {
        console.error("Fetch rider detail error:", err);
        setError(true);
      });
  }, [id]);

  if (error) {
    return <p style={{ textAlign: "center" }}>Rider not found</p>;
  }

  if (!rider) {
    return <p style={{ textAlign: "center" }}>Loading rider...</p>;
  }

  return (
    <div className="ROD_rider-details">
      {/* Rider Image */}
      <img
        src={rider.rPhoto || "/placeholder-rider.png"}
        className="ROD_rider-img"
        alt={rider.rName}
      />

      <div className="ROD_rider-frame">
        {/* Info Box */}
        <div className="ROD_rider-infoBox">
          <div className="ROD_rider-label">NATION</div>
          <div className="ROD_rider-label">TEAM</div>
          <div className="ROD_rider-label">BIKE</div>
          <div className="ROD_rider-label">AGE</div>

          <div className="ROD_rider-line" />
          <div className="ROD_rider-line" style={{ top: "182px" }} />
          <div className="ROD_rider-line" style={{ top: "103px" }} />

          <div className="ROD_rider-value" style={{ top: "42px", left: "537px" }}>
            {rider.rNationality || "-"}
          </div>

          <div className="ROD_rider-value" style={{ top: "122px", left: "362px" }}>
            {rider.rTeam || "-"}
          </div>

          <div className="ROD_rider-value" style={{ top: "199px", left: "508px" }}>
            {rider.rTeam ? rider.rTeam.split(" ")[0] : "-"}
          </div>

          <div className="ROD_rider-value" style={{ top: "277px", left: "537px" }}>
            {rider.rAge ? `${rider.rAge} yrs` : "-"}
          </div>
        </div>

        {/* Rider Name */}
        <div className="ROD_rider-name">
          {rider.rName?.toUpperCase()}
        </div>

        {/* Stats */}
        <div className="ROD_rider-statBox" style={{ left: "31px" }}>
          <div className="ROD_rider-bar" />
          <div className="ROD_rider-statTitle">World Championships</div>
          <div className="ROD_rider-statValue">{rider.rTitleCount ?? 0}</div>
        </div>

        <div className="ROD_rider-statBox" style={{ left: "384px" }}>
          <div className="ROD_rider-bar" />
          <div className="ROD_rider-statTitle">Victories</div>
          <div className="ROD_rider-statValue">{rider.rWins ?? 0}</div>
        </div>

        <div className="ROD_rider-statBox" style={{ left: "736px" }}>
          <div className="ROD_rider-bar" />
          <div className="ROD_rider-statTitle">Podiums</div>
          <div className="ROD_rider-statValue">{rider.rPodiums ?? 0}</div>
        </div>

        <div className="ROD_rider-statBox" style={{ left: "1089px" }}>
          <div className="ROD_rider-bar" />
          <div className="ROD_rider-statTitle">Total Races</div>
          <div className="ROD_rider-statValue">{rider.rTotalRaces ?? 0}</div>
        </div>
      </div>
    </div>
  );
};

export default MGP_riderDetails;