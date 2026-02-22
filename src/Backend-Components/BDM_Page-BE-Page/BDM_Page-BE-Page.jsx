import React from 'react';
import { useNavigate } from "react-router-dom";
import './BDM_Page-BE-Page.css';

import players from "../../assets/images/BDM_Page/licensed-image.jpeg"; 
import tournament from "../../assets/images/BDM_Page/BD7DDFAC-145A-4865-B58A-C00977D5A3C3.png";
import equipment from "../../assets/images/BDM_Page/YONEX_VOLTRIC80_3UG4-3.jpg";

const items = [
  {
    id: '1',
    name: 'Players',
    image: players,
    path: '/BDM_PlayersBE'
  },
  {
    id: '2',
    name: 'Tournaments',
    image: tournament,
    path: '/BDM_TournamentsBE'
  },
  {
    id: '3',
    name: 'Equipment',
    image: equipment,
    path: '/BDM_EquipmentBE'
  }
];

const BDM_Page_BackEnd = ({ theme }) => {
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
          <div className="page_backend_cardLabel">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BDM_Page_BackEnd;
