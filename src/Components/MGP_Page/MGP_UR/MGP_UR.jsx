import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MGP_UR.css";

const MGP_UpcomingRace = () => {
  const [race, setRace] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  // ================= FETCH NEXT RACE =================
  useEffect(() => {
    axios
      .get("http://localhost:8080/MGP_nextRace")
      .then((res) => {
        if (res.data.length > 0) {
          setRace(res.data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // ================= COUNTDOWN =================
  useEffect(() => {
    if (!race?.raceDate) return;

    const raceDate = new Date(race.raceDate);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = raceDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ expired: true });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [race]);

  if (!race) {
    return (
      <section className="UR_mgp-upcoming">
        <h2>Upcoming Race</h2>
        <p>Loading upcoming race...</p>
      </section>
    );
  }

  return (
    <section className="UR_mgp-upcoming">
      <h2>Upcoming Race</h2>

      <div className="UR_race-card">
        {/* IMAGE */}
        <div className="UR_race-image">
          <img
            src={race.racePhoto}
            alt={race.raceTitle}
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>

        {/* DETAILS */}
        <div className="UR_race-details">
          <h3>{race.raceTitle}</h3>
          <p>Circuit: {race.raceCircuit}</p>
          <p>Date: {new Date(race.raceDate).toLocaleString()}</p>

          {timeLeft.expired ? (
            <p className="UR_countdown">Race Started!</p>
          ) : (
            <p className="UR_countdown">
              {timeLeft.days}d {timeLeft.hours}h{" "}
              {timeLeft.minutes}m {timeLeft.seconds}s
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MGP_UpcomingRace;
