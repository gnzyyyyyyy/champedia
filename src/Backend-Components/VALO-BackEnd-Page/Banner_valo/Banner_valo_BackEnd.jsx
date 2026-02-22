import React from "react";
import "./Banner_valo_BackEnd.css";
import { useNavigate } from "react-router-dom";


import valoTeams from "../../../assets/images/valo_teams.png";
import valoPlayers from "../../../assets/images/valo_players.png";
import valoTournaments from "../../../assets/images/valo_tournaments.png";
import valoAgents from "../../../assets/images/valo_agents.png";
import valoMaps from "../../../assets/images/valo_maps.png";


const items = [
    { id: 1, name: "Teams", image: valoTeams, path: "/valo_teams_BE" },
    { id: 2, name: "Players", image: valoPlayers, path: "/valo_players_BE" }, 
    { id: 3, name: "Tournaments", image: valoTournaments, path: "/valo_tours_BE" },
    { id: 4, name: "Agents", image: valoAgents, path: "/valo_agents_BE" },
    { id: 4, name: "Maps", image: valoMaps, path: "/valo_maps_BE" },
];

const BannerValo_BackEnd = ({theme}) => {
    const navigate = useNavigate();
    return (
        <div className={`bannerValo ${theme}`}>
            <h1>Valorant Admin Portal</h1>

            <div className="gridContainer">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="card"
                        onClick={() => navigate(item.path)}
                    >
                        <img src={item.image} alt={item.name} />
                        <div className="cardLabel">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BannerValo_BackEnd;