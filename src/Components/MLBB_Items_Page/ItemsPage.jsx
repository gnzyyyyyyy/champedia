import React, {  useEffect, useState } from "react";
import axios from "axios";
import "./ItemsPage.css";
import mlbbBanner from "../../assets/images/mlbb_teams/mlbb_banner.png";

const ItemsPage = ({ theme }) => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    if (selectedType === "All") {
      axios
        .get("http://localhost:8080/mlbb_items")
        .then((res) => setItemsData(res.data));
    } else {
      axios
        .get(`http://localhost:8080/mlbb_items/type/${selectedType}`)
        .then((res) => setItemsData(res.data));
    }
  }, [selectedType]);

  return (
    <div className={`teams-page ${theme}`}>
      {/* Header */}
      <header className="header">
        <img src={mlbbBanner} alt="Mobile Legends" className="header-logo" />
        <nav className="nav-tabs">
          {["Attack", "Magic", "Defense", "Movement", "Jungling", "Roaming", "All"].map(
            (type) => (
              <button key={type} className={`nav-btn ${selectedType === type ? "active" : ""}`} onClick={() => setSelectedType(type)}>
                {type}
              </button>
            )
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="region-title">{selectedType} Items</h1>
            <div className="team-grid">
              {itemsData.map((item) => (
                <div key={item.id} className="team-card">
                  <img src={item.itemImage} alt={item.itemName} className="team-logo" />
                  <p className="team-name">{item.itemName}</p>
                  {/* Hover popup */}
                  <div className="item-popup">
                    <h4>{item.itemName}</h4>
                    <p>{item.itemDescription}</p>
                  </div>
                </div>
              ))}
            </div>
      </main>
    </div>
  );
};

export default ItemsPage;
