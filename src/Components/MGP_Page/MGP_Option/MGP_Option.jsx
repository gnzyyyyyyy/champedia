import React from 'react';
import { useNavigate } from "react-router-dom";
import './MGP_Option.css';

import championship from '../../../assets/images/mgp_index/mgp_option/championship_bg.png';
import riders from '../../../assets/images/mgp_index/mgp_option/riders_bg.png';
import teams from '../../../assets/images/mgp_index/mgp_option/teams_bg.png';
import circuits from '../../../assets/images/mgp_index/mgp_option/circuits_bg.png';
import transfer from '../../../assets/images/mgp_index/mgp_option/transfer_bg.png';
import hof from '../../../assets/images/mgp_index/mgp_option/hof_bg.png';

const items = [
  { id: '1', name: 'Championship', image: championship, path: '/MGP_Championship' },
  { id: '2', name: 'Riders', image: riders, path: '/MGP_Riders' },
  { id: '3', name: 'Teams', image: teams, path: '/MGP_Teams' },
  { id: '4', name: 'Circuits', image: circuits, path: '/MGP_Circuits' },
  { id: '5', name: 'Transfer', image: transfer, path: '/MGP_Transfer' },
  { id: '6', name: 'Hall of Fame', image: hof, path: '/MGP_Hof' },
];

const MGP_Option = () => {
  const navigate = useNavigate();

  return (
    <div className="OPT_option_gridContainer">
      {items.map((item) => (
        <div
          key={item.id}
          className="OPT_option_card"
          onClick={() => navigate(item.path)}
        >
          <img src={item.image} alt={item.name} />
          <div className="OPT_option_cardLabel">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default MGP_Option;
