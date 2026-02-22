import React from 'react';
import { useNavigate } from "react-router-dom";
import './Chess_Page-BE-Page.css'; 
// ⬆️ reuse CSS biar konsisten

// images (sementara / bebas ganti)
import players from "../../assets/images/Chess_Page/Thomas-Chess-World-Championship.webp";
import tournaments from "../../assets/images/Chess_Page/WC-2025.jpg";
import elo from "../../assets/images/Chess_Page/chess_rating_f651e760-84e7-427c-bbdf-fcfe3a781cfd.webp";

const items = [
  {
    id: '1',
    name: 'Players',
    image: players,
    path: '/Chess_PlayersBE'
  },
  {
    id: '2',
    name: 'Tournaments',
    image: tournaments,
    path: '/Chess_TournamentsBE'
  },
  {
    id: '3',
    name: 'ELO',
    image: elo,
    path: '/Chess_EloBE'
  }
];

const Chess_Page_BackEnd = ({ theme }) => {
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

export default Chess_Page_BackEnd;
