import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PUBGMapsPage.css";
import mlbbBanner from "../../assets/images/pubgnew2.png";

const PUBGMapsPage = ({ theme }) => {
    const [maps, setMaps] = useState([]);
    const [selectedMap, setSelectedMap] = useState(null);

    useEffect(() => {
        axios
        .get("http://localhost:8080/pubg_maps")
        .then((res) => setMaps(res.data))
        .catch(console.error);
    }, []);

    return (
        <div className={`teams-page ${theme}`}>
        
        {/* 🔒 HEADER — UNCHANGED */}
        <header className="header">
            <img src={mlbbBanner} alt="Mobile Legends" className="header-logo" />
        </header>

        {/* Main */}
        <main className="main-content">
            <h1 className="region-title">Maps</h1>

            <div className="map-grid">
            {maps.map((map) => (
                <div
                key={map.id}
                className="map-card"
                onClick={() => setSelectedMap(map)}
                >
                <img
                    src={map.mapImages}
                    alt={map.mapName}
                    className="map-image"
                />
                <p className="map-name">{map.mapName}</p>
                </div>
            ))}
            </div>
        </main>

        {/* Modal */}
        {selectedMap && (
            <div className="map-modal-overlay" onClick={() => setSelectedMap(null)}>
            <div
                className="map-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                src={selectedMap.mapLayout}
                alt="Map Layout"
                className="map-layout"
                />
            </div>
            </div>
        )}
        </div>
    );
};

export default PUBGMapsPage;
