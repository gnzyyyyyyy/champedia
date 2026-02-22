import React from 'react';
import './Matches_ML.css';


import rrqLogo from '../../../assets/images/rrq.png';
import onicLogo from '../../../assets/images/onic.png';

const Matches_ML = () => {
  const matchesList = [
    {
      id: 1,
      date: "October 10, 2025 - 15:00 WIB",
      teamA: { name: "RRQ", logo: rrqLogo },
      teamB: { name: "Onic", logo: onicLogo },
      title: "MPL Indonesia Season 16 - Playoffs"
    },
    {
      id: 2,
      date: "October 11, 2025 - 15:00 WIB",
      teamA: { name: "RRQ", logo: rrqLogo },
      teamB: { name: "FNOC", logo: onicLogo },
      title: "MPL Indonesia Season 16 - Playoffs"
    },
    {
      id: 3,
      date: "October 12, 2025 - 15:00 WIB",
      teamA: { name: "RRQ", logo: rrqLogo },
      teamB: { name: "Onic", logo: onicLogo },
      title: "MPL Indonesia Season 16 - Playoffs"
    }
    // ➕ Add more matches here later!
  ];

  return (
    <section className="matches-section">
      <h2 className="matches-title">Matches</h2>

      {matchesList.map((match) => (
        <div className="match-card" key={match.id}>
          <p className="match-date">{match.date}</p>

          <div className="match-versus">
            <div className="team">
              <img src={match.teamA.logo} alt={match.teamA.name} />
              <span>{match.teamA.name}</span>
            </div>

            <span className="vs">VS</span>

            <div className="team">
              <img src={match.teamB.logo} alt={match.teamB.name} />
              <span>{match.teamB.name}</span>
            </div>
          </div>

          <p className="match-type">{match.title}</p>
        </div>
      ))}
    </section>
  );
};

export default Matches_ML;