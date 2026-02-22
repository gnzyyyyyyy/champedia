import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './MGP_Page_BackEnd.css';

import championship from '../../../assets/images/mgp_index/mgp_option/championship_bg.png';
import riders from '../../../assets/images/mgp_index/mgp_option/riders_bg.png';
import teams from '../../../assets/images/mgp_index/mgp_option/teams_bg.png';
import circuits from '../../../assets/images/mgp_index/mgp_option/circuits_bg.png';
import transfer from '../../../assets/images/mgp_index/mgp_option/transfer_bg.png';
import hof from '../../../assets/images/mgp_index/mgp_option/hof_bg.png';
import highlight from '../../../assets/images/mgp_be/highlight.png';
import news from '../../../assets/images/mgp_be/news.png';
import nextRace from '../../../assets/images/mgp_be/nextRace.png';

const items = [
    { id: '1', name: 'Championship', image: championship, path: '/MGP_ChampionshipBE' },
    { id: '2', name: 'Riders', image: riders, path: '/MGP_RidersBE' },
    { id: '3', name: 'Teams', image: teams, path: '/MGP_TeamsBE' },
    { id: '4', name: 'Circuits', image: circuits, path: '/MGP_CircuitsBE' },
    { id: '5', name: 'Transfer', image: transfer, path: '/MGP_TransferBE' },
    { id: '6', name: 'Hall of Fame', image: hof, path: '/MGP_HofBE' },
    { id: '7', name: 'Highlight', image: highlight, path: '/MGP_HighlightBE' },
    { id: '8', name: 'News', image: news, path: '/MGP_NewsBE' },
    { id: '9', name: 'Next Race', image: nextRace, path: '/MGP_nextRaceBE' },
  ];

const MGP_Page_BackEnd = ({ theme }) => {
  const navigate = useNavigate();
  return (
    <div className="page_backend_gridContainer">
        {items.map((item) => (
          <div
            key={item.id}
            className="page_backend_card"
            onClick={() => navigate(item.path)}
            >
            <img src={item.image} alt={item.name} />
            <div className="page_backend_cardLabel">{item.name}</div>
          </div>
        ))}
      </div>
  );
};

export default MGP_Page_BackEnd;
