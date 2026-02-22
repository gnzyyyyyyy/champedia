import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VALOAgentsBE.css";

import valoBanner from "../../assets/images/valo_logo.png";

const VALOAgentsBE = ({ theme }) => {
    const [agents, setAgents] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editAgentID, setEditAgentID] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [agentToDelete, setAgentToDelete] = useState(null);

    const [selectedRole, setSelectedRole] = useState("All");

    const [newAgent, setNewAgent] = useState({
        agentName: "",
        agentRole: "",
        agentDescription: "",
        agentImages: "",
    });

    useEffect(() => {
        if(selectedRole === "All") {
            axios.get("http://localhost:8080/valo_agents")
                .then(res => setAgents(res.data))
        } else {
            axios.get(`http://localhost:8080/valo_agents/role/${selectedRole}`)
                .then(res => setAgents(res.data))
        }
    }, [selectedRole]);

    const handleRoleFilter = (role) => {
        setSelectedRole(role);
    };

    // Handle form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAgent({ ...newAgent, [name]: value });
    };

    // Add agent function
    const handleAddAgent = () => {
        axios .post("http://localhost:8080/valo_agents", newAgent)
            .then(() => {
                setShowForm(false);
                resetForm();
                window.location.reload();
            })
            .catch(err => {
            if (err.response && err.response.status === 409) {
                alert(err.response.data);
            } else {
                alert("An error occurred while adding the agent.");
            }
            })
    };

    const handleEdit = (id) => {
        const agent = agents.find(a => a.id === id);
        if (agent) {
            setEditAgentID(id);
            setNewAgent(agent);
            setIsEditing(true);
            setShowForm(true);
        }
    };

    const handleUpdateAgent = () => {
        axios.put(`http://localhost:8080/valo_agents/${editAgentID}`, newAgent)
            .then(() => {
                setShowForm(false);
                resetForm();
                window.location.reload();
            })
    };

    const handleRemove = (id) => {
        setAgentToDelete(id);
        setShowConfirmation(true);
    };

    const confirmRemove = () => {
        axios.delete(`http://localhost:8080/valo_agents/${agentToDelete}`)
            .then(() => {
                setShowConfirmation(false);
                setAgentToDelete(null);
                window.location.reload();
            });
    };

    const closeForm = () => {
        setShowForm(false);
        setIsEditing(false);
        setEditAgentID(null);
        resetForm();
    };

    const resetForm = () => {
        setNewAgent({
            agentName: "",
            agentRole: "",
            agentDescription: "",
            agentImages: "",
        });
    };

    return (
        <div className={`agents-page ${theme}`}>
            
            {/* Header */}
            <header className="header">
                <img src={valoBanner} alt="Valorant" className="header-logo" />
                <nav className="nav-tabs">
                    <button className="nav-btn" onClick={() => setShowForm(true)}>
                        Add Agent +
                    </button>
                    {["All", "Sentinel", "Controller", "Duelist", "Initiator"].map((role) => (
                        <button key={role} className="nav-btn" onClick={() => handleRoleFilter(role)}>
                            {role}
                        </button>
                    ))}
                </nav>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <h1 className="region-title">Agents</h1>
            </main>

            {/* Table */}
            <section className="results">
                <div className="results-section">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Agent ID</th>
                                <th>Agent Name</th>
                                <th>Agent Role</th>
                                <th>Agent Description</th>
                                {agents.length > 0 && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {agents.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center" }}>
                                        No agetns added yet.
                                    </td>
                                </tr>
                            ) : (
                                agents.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>
                                            <div className="team-cell">
                                                <img
                                                    src={row.agentImages}
                                                    alt={row.agentName}
                                                    className="team-icon"
                                                />
                                                <span>{row.agentName}</span>
                                            </div>
                                        </td>
                                        <td>{row.agentRole}</td>
                                        <td>{row.agentDescription}</td>
                                        <td>
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEdit(row.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="remove-btn"
                                                onClick={() => handleRemove(row.id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Add/Edit Modal */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{isEditing ? "Edit Agent" : "Add New Agent"}</h2>

                        <div className="form-group">
                            <label>Agent Name:</label>
                            <input
                                name="agentName"
                                value={newAgent.agentName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Role:</label>
                            <select
                                name="agentRole"
                                value={newAgent.agentRole}
                                onChange={handleChange}
                            >
                                <option value="">Select Role</option>
                                <option value="Sentinel">Sentinel</option>
                                <option value="Controller">Controller</option>
                                <option value="Duelist">Duelist</option>
                                <option value="Initiator">Initiator</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <textarea
                                name="agentDescription"
                                value={newAgent.agentDescription}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Agent Image:</label>
                            <input
                                name="agentImages"
                                value={newAgent.agentImages}
                                onChange={handleChange}
                            />
                            {newAgent.agentImages && (
                                <div className="image-preview">
                                    <img src={newAgent.agentImages} alt="Preview" className="preview-image" />
                                </div>
                            )}
                        </div>

                        <div className="modal-actions">
                            <button
                                className="add-btn"
                                onClick={isEditing ? handleUpdateAgent : handleAddAgent}
                            >
                                {isEditing ? "Update" : "Add"}
                            </button>
                            <button className="back-btn" onClick={closeForm}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete Modal */}
            {showConfirmation && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to remove this agent?</p>
                        <div className="modal-actions">
                            <button className="remove-btn" onClick={confirmRemove}>
                                Yes, Remove
                            </button>
                            <button
                                className="back-btn"
                                onClick={() => setShowConfirmation(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default VALOAgentsBE;