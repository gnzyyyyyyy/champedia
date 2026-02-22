import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import './Navbar.css'
import logo from '../../assets/images/champedia-logo.png'
import searchIconLight from '../../assets/images/search-w.png'
import searchIconDark from '../../assets/images/search-b.png'
import toggle_light from '../../assets/images/night.png'
import toggle_dark from '../../assets/images/day.png'

const esportsList = [
  { name: "Valorant", route: "/valo" },
  { name: "Mobile Legends", route: "/mlbb" },
  { name: "PUBG Mobile", route: "/pubg" },
  { name: "Clash Royale", route: "/cr" },
];

const sportsList = [
  { name: "MotoGP", route: "/MGP" },
  { name: "Formula 1", route: "/f1" },
  { name: "Badminton", route: "/badminton" },
  { name: "Chess", route: "/chess" },
];

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

const Navbar = ({ theme, setTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    /* ===== Scroll Effect ===== */
    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* ===== Theme Toggle ===== */
    const toggle_mode = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    /* ===== Search Logic ===== */
    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (!value.trim()) {
        setResults([]);
        return;
        }

        const filtered = searchItems.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
        );

        setResults(filtered);
    };

    const handleSelect = (item) => {
        setQuery("");
        setResults([]);

        if (item.route) {
        navigate(item.route);
        } else {
        alert(`Coming soon for ${item.name}!!!`);
        }
    };

    return (
        <div className={`navbar ${theme} ${isScrolled ? "scrolled" : ""}`}>
        {/* Logo */}
        <Link to="/login">
            <img src={logo} alt="Champedia Logo" className="logo" />
        </Link>

        {/* Navigation */}
        <ul>
            <li>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Champedia
            </Link>
            </li>

            {/* Esports Dropdown */}
            <li className="dropdown">
            Esports
            <ul className="dropdown-menu">
                {esportsList.map((item) => (
                <li key={item.name}>
                    <Link to={item.route}>{item.name}</Link>
                </li>
                ))}
            </ul>
            </li>

            {/* Sports Dropdown */}
            <li className="dropdown">
            Sports
            <ul className="dropdown-menu">
                {sportsList.map((item) => (
                <li
                    key={item.name}
                    onClick={() =>
                    !item.route && alert(`Coming soon for ${item.name}!!!`)
                    }
                >
                    {item.route ? (
                    <Link to={item.route}>{item.name}</Link>
                    ) : (
                    item.name
                    )}
                </li>
                ))}
            </ul>
            </li>
        </ul>

        {/* Search */}
        <div className="search-box">
            <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleSearch}
            />
            <img
            src={theme === "light" ? searchIconLight : searchIconDark}
            alt="search"
            />

            {results.length > 0 && (
            <div className="navbar-search-results">
                {results.map((item) => (
                <div
                    key={item.id}
                    className="navbar-search-item"
                    onClick={() => handleSelect(item)}
                >
                    {item.name}
                    <span className="type-label">
                    {item.type.toUpperCase()}
                    </span>
                </div>
                ))}
            </div>
            )}
        </div>

        {/* Theme Toggle */}
        <img
            onClick={toggle_mode}
            src={theme === "light" ? toggle_light : toggle_dark}
            alt="toggle"
            className="toggle-icon"
        />
        </div>
    );
}

export default Navbar