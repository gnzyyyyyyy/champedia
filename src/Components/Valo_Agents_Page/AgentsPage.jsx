import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AgentsPage.css";
import valoBanner from "../../assets/images/valo_logo.png";

const AgentsPage = ({ theme }) => {
  const [grouped, setGrouped] = useState({});
  const [selectedRole, setSelectedRole] = useState("All");

  useEffect(() => {
    const url =
      selectedRole === "All"
        ? "http://localhost:8080/valo_agents"
        : `http://localhost:8080/valo_agents/role/${selectedRole}`;

    axios.get(url).then((res) => groupAgentsByRole(res.data));
  }, [selectedRole]);

  const groupAgentsByRole = (agents) => {
    const grouped = agents.reduce((acc, agent) => {
      const role = agent.agentRole || "Unknown";

      if (!acc[role]) {
        acc[role] = [];
      }
      acc[role].push(agent);
      return acc;
    }, {});

    setGrouped(grouped);
  };

  return (
    <div className={`teams-page ${theme}`}>
      
      {/* Header */}
      <header className="header">
        <img src={valoBanner} alt="Valorant" className="header-logo" />

        <nav className="nav-tabs">
          {["All", "Duelist", "Initiator", "Sentinel", "Controller"].map(
            (role) => (
              <button
                key={role}
                className={`nav-btn ${selectedRole === role ? "active" : ""}`}
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </button>
            )
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="region-title">{selectedRole}</h1>

        {Object.keys(grouped).map((role) => (
          <section key={role} className="country-section">
            <h2 className="country-title">{role}</h2>

            <div className="team-grid">
              {grouped[role].map((agent) => (
                <div key={agent.id} className="team-card">
                  <img
                    src={agent.agentImages}
                    alt={agent.agentName}
                    className="team-logo"
                  />
                  <p className="teamName">{agent.agentName}</p>

                  {/* Hover Description Panel */}
                  <div className="player-popup">
                    <h4>{agent.agentName}</h4>
                    <p style={{ padding: "10px", textAlign: "center" }}>
                      {agent.agentDescription}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default AgentsPage;
