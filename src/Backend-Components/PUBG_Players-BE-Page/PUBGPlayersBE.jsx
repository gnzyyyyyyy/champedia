import react, { useState, useEffect, use} from "react";
import axios from "axios";
import "./PUBGPlayersBE.css";
import mlbbBanner from "../../assets/images/mlbb_teams/mlbb_banner.png";

const PUBGPlayersBE = ({theme}) => {
    const [ players, setPlayers ] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editPlayerID, setEditPlayerID] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [playerToDelete, setPlayerToDelete] = useState(null);

    const [selectedRegion, setSelectedRegion] = useState("All");

    const [teams, setTeams] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const [newPlayer, setNewPlayer] = useState({
        playerIGN: "",
        playerName: "",
        playerRole: "",
        playerRegion: "",
        playerCountry: "",
        country_flag: "",
        teamID: "",
    });

    useEffect(() => {
        if(selectedRegion === "All") {
            axios.get("http://localhost:8080/pubg_players")
                .then(res => setPlayers(res.data))
        } else {
            axios.get(`http://localhost:8080/pubg_players/region/${selectedRegion}`)
                .then(res => setPlayers(res.data))
        }
    }, [selectedRegion]);

    useEffect(() => {
        axios.get("http://localhost:8080/pubg_teams")
            .then(res => setTeams(res.data))
    }, []);

    const handleRegionFilter = (region) => {
        setSelectedRegion(region);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPlayer({ ...newPlayer, [name]: value }); 
    };

    const handleAddPlayer = () => {
        axios
            .post("http://localhost:8080/pubg_players", newPlayer)
            .then(() => {
                setShowForm(false);
                resetForm();
                window.location.reload();
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    setErrorMessage(err.response.data);
                } else {
                    console.error(err);
                }
            })
    };

    const handleEdit = (id) => {
        setErrorMessage("");
        const player = players.find(p => p.id === id);
        setEditPlayerID(id);
        setNewPlayer(player);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleUpdatePlayer = () => {
        axios
            .put(`http://localhost:8080/pubg_players/${editPlayerID}`, newPlayer)
            .then(() => {
                setShowForm(false);
                resetForm();
                window.location.reload();
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    setErrorMessage(err.response.data);
                } else {
                    console.error(err);
                }
            })
    };

    const handleRemove = (id) => {
        setPlayerToDelete(id);
        setShowConfirmation(true);
    };

    const confirmRemove = () => {
        axios
            .delete(`http://localhost:8080/pubg_players/${playerToDelete}`)
            .then(() => {
                setShowConfirmation(false);
                setPlayerToDelete(null);
                window.location.reload();
            })
    };

    const closeForm = () => {
        setShowForm(false);
        setIsEditing(false);
        setEditPlayerID(null);
        resetForm();
    };

    const resetForm = () => {
        setNewPlayer({
            playerIGN: "",
            playerName: "",
            playerRole: "",
            playerRegion: "",
            playerCountry: "",
            country_flag: "",
            teamID: "",
        });
    };

    // < -- ADDITION --> //
    
    const getTeamInfo = (teamID) => {
        const team = teams.find(t => t.id === teamID);
        if (!team) return { name: "No Team", country: "" };
        return { name: team.teamName, country: team.teamCountry };
    }


    return (
        <div className={`players-page ${theme}` }>
            
            {/* Header */}
            <header className="header">
                <img src={mlbbBanner} alt="Mobile Legends" className="header-logo" />
                <nav className="nav-tabs">
                <button className="nav-btn" onClick={() => setShowForm(true)}>
                    Add Player +
                </button>
                {["SEA", "South Asia", "MEA", "Americas", "China", "Korea", "Japan", "India", "All"].map((region) => (
                    <button key={region} className="nav-btn" onClick={() => handleRegionFilter(region)}>
                        {region}
                    </button>
                ))}
                </nav>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <h1 className="region-title">Players Database - {selectedRegion}</h1>
            </main>

            {/* Table */}
            <section className="results">
                <div className="results-section">
                    <table className="results-table">
                        <thead>
                        <tr>
                            <th>Player ID</th>
                            <th>In-Game Name</th>
                            <th>Real Name</th>
                            <th>Role</th>
                            <th>Region</th>
                            <th>Country</th>
                            <th>Team ID</th>
                            {players.length > 0 && <th>Actions</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {players.length === 0 ? (
                            <tr>
                            <td colSpan="8" style={{ textAlign: "center" }}>
                                No players added yet.
                            </td>
                            </tr>
                        ) : (
                            players.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.playerIGN}</td>
                                <td>{row.playerName}</td>
                                <td>{row.playerRole}</td>
                                <td>{row.playerRegion}</td>
                                <td>
                                <div className="team-cell">
                                    <img
                                    src={row.country_flag}
                                    alt={row.country_flag}
                                    className="team-icon"
                                    />
                                    <span>{row.playerCountry}</span>
                                </div>
                                </td>
                                <td>
                                    {row.teamID 
                                        ? `${getTeamInfo(row.teamID).name} (${getTeamInfo(row.teamID).country})` 
                                        : "No Team"}
                                </td>
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

             {/* Add / Edit Modal */}
            {showForm && (
                <div className="modal-overlay">
                <div className="modal-content">
                    <h2>{isEditing ? "Edit Player" : "Add New Player"}</h2>

                    <div className="form-group">
                    <label>In-Game Name:</label>
                    <input name="playerIGN" value={newPlayer.playerIGN} onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                    <label>Real Name:</label>
                    <input name="playerName" value={newPlayer.playerName} onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                    <label>Role:</label>
                    <input name="playerRole" value={newPlayer.playerRole} onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                        <label>Region:</label>
                        <select
                            name="playerRegion"
                            value={newPlayer.playerRegion}
                            onChange={handleChange}
                        >
                            <option value="">-- Select Region --</option>
                            <option value="SEA">SEA</option>
                            <option value="South Asia">South Asia</option>
                            <option value="MEA">MEA</option>
                            <option value="Americas">Americas</option>
                            <option value="China">China</option>
                            <option value="Korea">Korea</option>
                            <option value="Japan">Japan</option>
                            <option value="India">India</option>
                        </select>
                    </div>

                    <div className="form-group">
                    <label>Country:</label>
                    <input name="playerCountry" value={newPlayer.playerCountry} onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                    <label>Country Flag:</label>
                    <input 
                        name="country_flag" 
                        value={newPlayer.country_flag} 
                        onChange={handleChange} />
                    {newPlayer.country_flag && (
                        <div className="flag-preview">
                        <img src={newPlayer.country_flag} alt="Preview" />
                        </div>
                    )}
                    </div>

                    <div className="form-group">
                        <label>Team:</label>
                        <select
                            name="teamID"
                            value={newPlayer.teamID || ""}
                            onChange={handleChange}
                        >
                            <option value="">No Team</option>
                            {teams.map(team => (
                                <option key={team.id} value={team.id}>
                                    {team.teamName} ({team.teamCountry})
                                </option>
                            ))}
                        </select>
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="modal-actions">
                    <button
                        className="add-btn"
                        onClick={isEditing ? handleUpdatePlayer : handleAddPlayer}
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
                    <p>Are you sure you want to remove this player?</p>
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
    );
};

export default PUBGPlayersBE;