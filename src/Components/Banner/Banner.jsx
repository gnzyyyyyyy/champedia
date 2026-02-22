import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import slidingImage from "../../assets/images/MPLS16.png";
import "./Banner.css";

export const Banner = ({ theme, setTheme }) => {

  const searchItems = [
    { id: 1, name: "Valorant", type: "esport", route: "/valo" },
    { id: 2, name: "Mobile Legends: Bang Bang", type: "esport", route: "/mlbb" },
    { id: 3, name: "PUBG Mobile", type: "esport", route: "/pubg" },
    { id: 4, name: "Clash Royale", type: "esport", route: "/cr" },

    { id: 5, name: "MotoGP", type: "sport", route: "/MGP" },
    { id: 6, name: "Formula 1", type: "sport", route: "/f1" },
    { id: 7, name: "Badminton", type: "sport", route: "/badminton" },
    { id: 8, name: "Chess", type: "sport", route: "/chess" },
  ];

  const [query, setQuery] = useState("");
  const [results, setResult] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResult([]);
      return;
    }

    const filtered = searchItems.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setResult(filtered);
  };

  const handleSelect = (item) => {
    setQuery(item.name);
    setResult([]);

    if (item.route) {
      navigate(item.route);
    } else {
      alert(`Coming soon for ${item.name}!!!`);
    }
  };

  return (
    <div className="banner">
      <p className="the-encyclopedia-of">
        <span className="span">The Encyclopedia of </span>
        <span className="text-wrapper-2">Sports</span>
        <span className="span"> and </span> 
        <span className="text-wrapper-3">Esports</span>
        <span className="span"> Industry in The World</span>
      </p>

      <img className="sliding-image" alt="Sliding image" src={slidingImage} />

      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search esports or sports..."
            value={query}
            onChange={handleSearch}
          />
        </div>

        <button className="search-button">
          <div className="text-wrapper">Search</div>
        </button>

      </div>

      {results.length > 0 && (
        <div className="search-results">
          {results.map((item) => (
            <div
              key={item.id}
              className="search-result-item"
              onClick={() => handleSelect(item)}
            >
              {item.name}
              <span className="type-label">{item.type.toUpperCase()}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Banner;
