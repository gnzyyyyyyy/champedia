import React from "react";
import "./Banner_valo.css";
import { useNavigate } from "react-router-dom";

import valoBanner from "../../../assets/images/banner_valo.png";
import valoTeams from "../../../assets/images/valo_teams.png";
import valoPlayers from "../../../assets/images/valo_players.png";
import valoTournaments from "../../../assets/images/valo_tournaments.png";
import valoAgents from "../../../assets/images/valo_agents.png";
import valoMaps from "../../../assets/images/valo_maps.png";


const items = [
    { id: 1, name: "Teams", image: valoTeams, path: "/Valo_Teams" },
    { id: 2, name: "Players", image: valoPlayers, path: "/Valo_Players" }, 
    { id: 3, name: "Tournaments", image: valoTournaments, path: "/Valo_Tours" },
    { id: 4, name: "Agents", image: valoAgents, path: "/Valo_Agents" },
    { id: 4, name: "Maps", image: valoMaps, path:"/VALOMapsPage" },
];

const BannerValo = ({theme}) => {
    const navigate = useNavigate();
    return (
        <div className={`bannerValo ${theme}`}>
            <div className="mainBanner">
                <img src={valoBanner} alt="VALO Banner" />
            </div>

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

export default BannerValo;