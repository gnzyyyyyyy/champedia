import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VALOToursBE.css";
import valoBanner from "../../assets/images/valo_logo.png";

const VALOToursBE = ({ theme }) => {
    const [tournaments, setTournaments] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTournamentID, setEditTournamentID] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [tournamentToDelete, setTournamentToDelete] = useState(null);

    const [selectedTier, setSelectedTier] = useState("All");

    const [newTournament, setNewTournament] = useState({
        tourLogo: "",
        tourName: "",
        tourTier: "",
        tourRegion: "",
        tourLocation: "",
        tourDates: "",
        tourPrizePool: "",
    });

    useEffect(() => {
        if(selectedTier === "All"){
            axios.get("http://localhost:8080/valo_tours")
                .then(res => setTournaments(res.data))
        } else {
            axios.get(`http://localhost:8080/valo_tours/tier/${selectedTier}`)
                .then(res => setTournaments(res.data))
        }
    }, [selectedTier]);

    const handleTypeFilter = (tier) => {
        setSelectedTier(tier);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTournament({ ...newTournament, [name]: value });
    };

    const handleAddTournament = () => {
        axios.post("http://localhost:8080/valo_tours", newTournament)
            .then(() => {
                setShowForm(false);
                resetForm();
                window.location.reload();
            });
    };

    const handleEdit = (id) => {
        const tournament = tournaments.find((to) => to.id === id);
            setEditTournamentID(id);
            setNewTournament(tournament);
            setIsEditing(true);
            setShowForm(true);
    };

    const handleUpdateTournament = () => {
        axios.put(`http://localhost:8080/valo_tours/${editTournamentID}`, newTournament)
            .then(() => {
                setShowForm(false);
                resetForm();
                window.location.reload();
            });
    };

    const handleRemove = (id) => {
        setTournamentToDelete(id);
        setShowConfirmation(true);
    };

    const confirmRemove = () => {
        axios.delete(`http://localhost:8080/valo_tours/${tournamentToDelete}`)
            .then(() => {
                setShowConfirmation(false);
                setTournamentToDelete(null);
                window.location.reload();
            });
    };

    const closeForm = () => {
        setShowForm(false);
        setIsEditing(false);
        setEditTournamentID(null);
        resetForm();
    };

    const resetForm = () => {
        setNewTournament({
            tourLogo: "",
            tourName: "",
            tourTier: "",
            tourRegion: "",
            tourLocation: "",
            tourDates: "",
            tourPrizePool: "",
        });
    };

    return (
        <div className={`tournaments-page ${theme}`}>
            {/* Header */}
            <header className="header">
                <img src={valoBanner} alt="Mobile Legends" className="header-logo" />
                <nav className="nav-tabs">
                    <button className="nav-btn" onClick={() => setShowForm(true)}>
                        Add Tournament +
                    </button>
                    {["All", "S", "A", "B", "C", "Q"].map((tier) => (
                        <button key={tier} className="nav-btn" onClick={() => handleTypeFilter(tier)}>
                            Tier {tier}
                        </button>
                    ))}
                </nav>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <h1 className="region-title">Tournaments - {selectedTier}</h1>
            </main>

            {/* Table */}
            <section className="results">
                <div className="results-section">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>Tier</th>
                                <th>Region</th>
                                <th>Location</th>
                                <th>Dates</th>
                                <th>Prize Pool</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tournaments.length === 0 ? (
                                <tr>
                                    <td colSpan="10" style={{ textAlign: "center" }}>
                                        No tournaments added yet.
                                    </td>
                                </tr>
                            ) : (
                                tournaments.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>
                                            {row.tourLogo ? (
                                                <img
                                                    src={row.tourLogo}
                                                    alt="Tournament Logo"
                                                    className="team-icon"
                                                />
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                        <td>{row.tourName}</td>
                                        <td>{row.tourTier}</td>
                                        <td>{row.tourRegion}</td>
                                        <td>{row.tourLocation}</td>
                                        <td>{row.tourDates}</td>
                                        <td>{row.tourPrizePool}</td>
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
                        <h2>{isEditing ? "Edit Tournament" : "Add New Tournament"}</h2>

                        <div className="form-group">
                            <label>Tournament Name:</label>
                            <input
                                name="tourName"
                                value={newTournament.tourName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Tier:</label>
                            <select
                                name="tourTier"
                                value={newTournament.tourTier}
                                onChange={handleChange}
                            >
                                {["S", "A", "B", "C", "Q"].map((tourTier) => (
                                    <option key={tourTier} value={tourTier}>
                                        {tourTier}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Region:</label>
                            <input
                                name="tourRegion"
                                value={newTournament.tourRegion}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Location:</label>
                            <input
                                name="tourLocation"
                                value={newTournament.tourLocation}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Date Start:</label>
                            <input
                                name="tourDates"
                                value={newTournament.tourDates}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Prize Pool:</label>
                            <input
                                name="tourPrizePool"
                                value={newTournament.tourPrizePool}
                                onChange={handleChange}
                                placeholder="$500,000"
                            />
                        </div>

                        <div className="form-group">
                            <label>Tournament Logo:</label>
                            <input 
                                name="tourLogo"
                                value={newTournament.tourLogo}
                                onChange={handleChange}
                            />
                            {newTournament.tourLogo && (
                                <div className="logo-preview">
                                    <img src={newTournament.tourLogo} alt="Preview" />
                                </div>
                            )}
                        </div>

                        <div className="modal-actions">
                            <button
                                className="add-btn"
                                onClick={isEditing ? handleUpdateTournament : handleAddTournament}
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
                        <p>Are you sure you want to remove this tournament?</p>
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

export default VALOToursBE;
