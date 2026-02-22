import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CRTeamsBE.css";
import crLogo from "../../assets/images/cr_logo.png";

const CRTeamsBE = ({theme}) => {
    const [teams, setTeams] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTeamID, setEditTeamID] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState(null);

    const [filteredTeams, setFilteredTeams] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);


    const [newTeam, setNewTeam] = useState({
        teamName: "",
        teamNickname: "",
        teamLogo: "",
        teamRegion: "",
        teamCountry: "",
        teamStatus: "Active",
    });

    useEffect(() => {
        axios
            .get("http://localhost:8080/cr_teams")
            .then((response) => setTeams(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTeam({ ...newTeam, [name]: value });
        };

    const handleAddTeam = () => {
        axios
            .post("http://localhost:8080/cr_teams", newTeam)
            .then(() => {
                setShowForm(false);
                resetForm();
                window.location.reload();
            })
    };
    

    const handleEdit = (id) => {
        const team = teams.find(t => t.id === id);
        setEditTeamID(id);
        setNewTeam(team);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleUpdateTeam = () => {
        axios
            .put(`http://localhost:8080/cr_teams/${editTeamID}`, newTeam)
            .then(() => {
                setShowForm(false);
                resetForm();
                window.location.reload();
            })
    };

    const handleRemove = (id) => {
        setTeamToDelete(id);
        setShowConfirmation(true);
    };

    const confirmRemove = () => {
        axios
            .delete(`http://localhost:8080/cr_teams/${teamToDelete}`)
            .then(() => {
                setShowConfirmation(false);
                setTeamToDelete(null);
                window.location.reload();
            })
    }

    const closeForm = () => {
        setShowForm(false);
        setIsEditing(false);
        setEditTeamID(null);
        resetForm();
    };

    const resetForm = () => {
        setNewTeam({
            teamName: "",
            teamNickname: "",
            teamLogo: "",
            teamRegion: "",
            teamCountry: "",
            teamStatus: "Active",
        });
    };

    // <-- Region Selection --> //
    const handleRegionSelect = (region) => {
        setSelectedRegion(region);

        if(region === "All") {
            setFilteredTeams(teams);
            return;
        }

        axios.get(`http://localhost:8080/cr_teams/region/${region}`)
            .then((response) => {
                setFilteredTeams(response.data);
            })
    }

    // filteredTeams by Country
    const groupedByCountry = filteredTeams.reduce((groups, team) => {
        const country = team.teamCountry;
        if (!groups[country]) {
            groups[country] = [];
        }
        groups[country].push(team);
        return groups;
    }, {});

    return (
        <div className={`teams-page ${theme}`}>

            {/* Header */}
            <header className="header">
                <img src={crLogo} alt="Mobile Legends" className="header-logo" />
                <nav className="nav-tabs">
                <button className="nav-btn" onClick={() => setShowForm(true)}>
                    Add Team +
                </button>
                {["SEA", "Brazil", "MENA", "All"].map((region) => (
                    <button key={region} className="nav-btn" onClick={() => handleRegionSelect(region)}>
                        {region}
                    </button>
                ))}
                </nav>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <h1 className="region-title">Teams Database</h1>
            </main>

            {/* Table */}
            <section className="tournament-results">
                <div className="results-section">
                    <table className="results-table">
                        <thead>
                        <tr>
                            <th>Team ID</th>
                            <th>Team Name</th>
                            <th>Team Nickname</th>
                            <th>Team Logo</th>
                            <th>Region</th>
                            <th>Country</th>
                            <th>Status</th>
                            {teams.length > 0 && <th>Actions</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {selectedRegion && Object.keys(groupedByCountry).length > 0 ? (
                            Object.keys(groupedByCountry).map((country) => (
                                <>
                                    {/* Country Header Row */}
                                    <tr className="country-header">
                                        <td colSpan="8"><strong>{country}</strong></td>
                                    </tr>

                                    {/* Teams under this country */}
                                    {groupedByCountry[country].map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.id}</td>
                                            <td>{row.teamName}</td>
                                            <td>{row.teamNickname}</td>
                                            <td>
                                                <div className="team-cell">
                                                    <img src={row.teamLogo} className="team-icon" />
                                                    <span>{row.teamName}</span>
                                                </div>
                                            </td>
                                            <td>{row.teamRegion}</td>
                                            <td>{row.teamCountry}</td>
                                            <td>{row.teamStatus}</td>
                                            <td>
                                                <button className="edit-btn" onClick={() => handleEdit(row.id)}>Edit</button>
                                                <button className="remove-btn" onClick={() => handleRemove(row.id)}>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ))
                        ) : (
                            teams.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.teamName}</td>
                                    <td>{row.teamNickname}</td>
                                    <td>
                                        <div className="team-cell">
                                            <img src={row.teamLogo} className="team-icon" />
                                            <span>{row.teamName}</span>
                                        </div>
                                    </td>
                                    <td>{row.teamRegion}</td>
                                    <td>{row.teamCountry}</td>
                                    <td>{row.teamStatus}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleEdit(row.id)}>Edit</button>
                                        <button className="remove-btn" onClick={() => handleRemove(row.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </section>

        {/* Add / Edit Modal */}
        {showForm && (
            <div className="modal-overlay">
            <div className="modal-content">
                <h2>{isEditing ? "Edit Team" : "Add New Team"}</h2>

                <div className="form-group">
                <label>Team Name:</label>
                <input name="teamName" value={newTeam.teamName} onChange={handleChange} />
                </div>

                <div className="form-group">
                <label>Team Nickname:</label>
                <input name="teamNickname" value={newTeam.teamNickname} onChange={handleChange} />
                </div>

                <div className="form-group">
                <label>Region:</label>
                <input name="teamRegion" value={newTeam.teamRegion} onChange={handleChange} />
                </div>

                <div className="form-group">
                <label>Country:</label>
                <input name="teamCountry" value={newTeam.teamCountry} onChange={handleChange} />
                </div>

                <div className="form-group">
                <label>Status:</label>
                <select name="teamStatus" value={newTeam.teamStatus} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                </div>

                <div className="form-group">
                <label>Team Logo:</label>
                <input
                    name="teamLogo"
                    value={newTeam.teamLogo}
                    onChange={handleChange}
                    />
                {newTeam.teamLogo && (
                    <div className="logo-preview">
                    <img src={newTeam.teamLogo} alt="Preview" />
                    </div>
                )}
                </div>

                <div className="modal-actions">
                <button
                    className="add-btn"
                    onClick={isEditing ? handleUpdateTeam : handleAddTeam}
                >
                    {isEditing ? "Update" : "Add"}
                </button>
                <button className="back-btn" onClick={closeForm}>
                    Back
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
                <p>Are you sure you want to remove this team?</p>
                <div className="modal-actions">
                <button className="remove-btn" onClick={confirmRemove}>
                    Yes, Remove
                </button>
                <button className="back-btn" onClick={() => setShowConfirmation(false)}>
                    Cancel
                </button>
                </div>
            </div>
            </div>
            )}
        </div>
    );
};

export default CRTeamsBE;