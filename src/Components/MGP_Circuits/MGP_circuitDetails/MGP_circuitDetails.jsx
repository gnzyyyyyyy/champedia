import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MGP_circuitDetails.css";

const MGP_circuitDetails = ({ theme }) => {
  const { id } = useParams();

  const [circuit, setCircuit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCircuit = async () => {
      try {
        const res = await fetch(`http://localhost:8080/circuit/${id}`);
        if (!res.ok) throw new Error("Circuit not found");

        const data = await res.json();
        setCircuit(data);
      } catch (err) {
        console.error("Fetch circuit error:", err);
        setCircuit(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCircuit();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading circuit...</p>;
  if (!circuit) return <p style={{ textAlign: "center" }}>Circuit not found</p>;

  return (
    <div className={`COD_circuitDetails ${theme}`}>
      {/* ===== CIRCUIT RECORDS ===== */}
      <div className="COD_circuitDetails__circuitRecordsParent">
        <div className="COD_circuitDetails__circuitRecords">
          CIRCUIT RECORDS
        </div>

        <div className="COD_circuitDetails__portimao">
          {circuit.circuitName.toUpperCase()}
        </div>

        <div className="COD_circuitDetails__mostWins">MOST WINS</div>
        <div className="COD_circuitDetails__mostPoles">MOST POLES</div>

        {/* MOST WINS */}
        <div className="COD_circuitDetails__image3Parent">
          <div className="COD_circuitDetails__jorgeMartin">
            {circuit.circuitMostWinName}
          </div>
        </div>

        {/* MOST POLES */}
        <div className="COD_circuitDetails__image3Group">
          <div className="COD_circuitDetails__jorgeMartin">
            {circuit.circuitMostPoleName}
          </div>
        </div>
      </div>

      {/* ===== STATS ===== */}
      <div className="COD_circuitDetails__statsWrapper">
        <div className="COD_circuitDetails__lineParent">
          <div className="COD_circuitDetails__line"></div>
          <div className="COD_circuitDetails__bestPole">BEST POLE</div>
          <div className="COD_circuitDetails__valueBig">
            {circuit.circuitBestPole}
          </div>
        </div>

        <div className="COD_circuitDetails__lineGroup">
          <div className="COD_circuitDetails__line"></div>
          <div className="COD_circuitDetails__bestPole">BEST RACE LAP</div>
          <div className="COD_circuitDetails__valueBig">
            {circuit.circuitBestRaceLap}
          </div>
        </div>

        <div className="COD_circuitDetails__lineContainer">
          <div className="COD_circuitDetails__line"></div>
          <div className="COD_circuitDetails__bestPole">TOP SPEED</div>
          <div className="COD_circuitDetails__kmh">
            {circuit.circuitTopSpeed} KM/H
          </div>
        </div>

        <div className="COD_circuitDetails__frameDiv">
          <div className="COD_circuitDetails__line"></div>
          <div className="COD_circuitDetails__bestPole">CORNERS</div>
          <div className="COD_circuitDetails__corners">
            {circuit.circuitCorner}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MGP_circuitDetails;
