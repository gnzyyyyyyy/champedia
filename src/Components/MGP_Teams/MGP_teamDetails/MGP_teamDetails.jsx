import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MGP_teamDetails.css";

const MGP_teamDetails = () => {
  const { id } = useParams();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`http://localhost:8080/team/${id}`);
        if (!res.ok) throw new Error("Team not found");

        const data = await res.json();
        setTeam(data);
      } catch (err) {
        console.error("Fetch team error:", err);
        setTeam(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading team...</p>;
  if (!team) return <p style={{ textAlign: "center" }}>Team not found</p>;

  return (
    <div className="TOD_team-details">
      <div className="TOD_team-wrapper">
        {/* LOGO TIM */}
        <img
          className="TOD_team-aprilia-img"
          src={team.tLogo}
          alt={team.tName}
        />

        {/* NAMA TIM */}
        <div className="TOD_team-name">
          {team.tName.split(" ")[0]}
          <br />
          {team.tName.split(" ").slice(1).join(" ")}
        </div>

        {/* RIDER BOX */}
        <div className="TOD_team-rider-box">
          <div className="TOD_team-line" />

          <div className="TOD_team-rider-name">
            {team.riderName1}
          </div>

          <div className="TOD_team-rider-subname">
            {team.riderName2}
          </div>
        </div>

        <div className="TOD_team-riders-title">TEAM RIDERS</div>
      </div>
    </div>
  );
};

export default MGP_teamDetails;
