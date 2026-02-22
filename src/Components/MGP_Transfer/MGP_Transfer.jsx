import React, { useEffect, useState } from "react";
import "./MGP_Transfer.css";

const MGP_Transfer = () => {
  const [category, setCategory] = useState("MotoGP");
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const res = await fetch("http://localhost:8080/transfer");
        if (!res.ok) throw new Error("Failed to fetch transfers");

        const data = await res.json();
        setTransfers(data);
      } catch (err) {
        console.error("Fetch transfer error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading transfers...</p>;
  }

  return (
    <div className="TRF_mgpTransfer_wrapper">

      {/* Title */}
      <h1 className="TRF_mgpTransfer_title">MARKET TRANSFER</h1>

      {/* Category Buttons */}
      <div className="TRF_categories">
        {["MotoGP", "Moto2", "Moto3", "MotoE"].map((cat) => (
          <button
            key={cat}
            className={`TRF_category_button ${
              category === cat ? "TRF_active" : ""
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Transfer Cards */}
      <div className="TRF_transfer_container">
        {transfers.map((item) => (
          <div key={item.transferID} className="TRF_transfer_card">

            <div className="TRF_transfer_info">
              <div className="TRF_transfer_rider">
                {item.riderName}
              </div>

              <div className="TRF_transfer_move">
                <span className="TRF_fromTeam">{item.teamName1}</span>
                <span className="TRF_arrow">→</span>
                <span className="TRF_toTeam">{item.teamName2}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default MGP_Transfer;
