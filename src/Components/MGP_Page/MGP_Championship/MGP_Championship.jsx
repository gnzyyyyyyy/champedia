import React, { useEffect, useState } from "react";
import "./MGP_Championship.css";

const MGP_Championship = () => {
  const [category, setCategory] = useState("MotoGP");
  const [championships, setChampionships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchChampionship = async () => {
      try {
        const res = await fetch("http://localhost:8080/championship");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setChampionships(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchChampionship();
  }, []);

  const currentChampionship = championships.find(
    (c) => c.cCategory === category
  );

  return (
    <section className="CHM_championship">
      <h2>Championship</h2>

      {/* Category Buttons */}
      <div className="CHM_categories">
        {["MotoGP", "Moto2", "Moto3", "MotoE"].map((cat) => (
          <button
            key={cat}
            className={`CHM_category_button ${
              category === cat ? "CHM_active" : ""
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="CHM_table_wrapper">
        <table className="CHM_championship_table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Rider</th>
              <th>Team</th>
              <th>Points</th>
              <th>Gap</th>
            </tr>
          </thead>

          <tbody key={category} className="CHM_fade">
            {/* Loading */}
            {loading && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            )}

            {/* Error */}
            {error && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "red" }}>
                  Failed to load data
                </td>
              </tr>
            )}

            {/* Data */}
            {!loading &&
              !error &&
              currentChampionship?.standings?.length > 0 &&
              [...currentChampionship.standings]
                .sort((a, b) => b.points - a.points)
                .map((s, index) => {
                  // SUPPORT SEMUA STRUKTUR DATA
                  const riderName =
                    s.riderName ||
                    s.riderId?.riderName ||
                    "Unknown Rider";

                  const teamName =
                    s.teamName ||
                    s.teamId?.teamName ||
                    "Unknown Team";

                  return (
                    <tr key={s.riderId ?? index}>
                      <td>{index + 1}</td>
                      <td>{riderName}</td>
                      <td>{teamName}</td>
                      <td>{s.points ?? 0}</td>
                      <td>{index === 0 ? "—" : `-${s.gap ?? 0} pts`}</td>
                    </tr>
                  );
                })}

            {/* No Data */}
            {!loading &&
              !error &&
              (!currentChampionship ||
                currentChampionship.standings?.length === 0) && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No data available
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MGP_Championship;
