import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MGP_circuitsOption.css";

const MGP_circuitsOption = () => {
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCircuits = async () => {
      try {
        const res = await fetch("http://localhost:8080/circuit");
        if (!res.ok) throw new Error("Failed to fetch circuits");

        const data = await res.json();
        setCircuits(data);
      } catch (err) {
        console.error("Fetch circuits error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCircuits();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading circuits...</p>;
  }

  return (
    <div className="CO_circuitsOption_container">
      {circuits.map((circuit) => (
        <div
          key={circuit.circuitID}
          className="CO_circuitsOption_card"
          onClick={() =>
            navigate(`/MGP_Circuits/${circuit.circuitID}`)
          }
        >
          {/* TANPA FOTO */}
          <div className="CO_circuitsOption_cardLabel">
            {circuit.circuitName}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MGP_circuitsOption;
