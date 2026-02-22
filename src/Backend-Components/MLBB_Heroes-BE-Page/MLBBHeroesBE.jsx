import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MLBBHeroesBE.css";
import mlbbBanner from "../../assets/images/mlbb_teams/mlbb_banner.png";

const MLBBHeroesBE = ({ theme }) => {
    const [heroes, setHeroes] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editHeroID, setEditHeroID] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [heroToDelete, setHeroToDelete] = useState(null);

    const [selectedRole, setSelectedRole] = useState("All");

    const [newHero, setNewHero] = useState({
        heroName: "",
        heroRole: "",
        heroDescription: "",
        heroImages: "",
    });

    //Load heroes from backend
    useEffect(() => {
        if(selectedRole === "All"){
            axios.get("http://localhost:8080/mlbb_heroes")
                .then(res => setHeroes(res.data))
        } else {
            axios.get(`http://localhost:8080/mlbb_heroes/role/${selectedRole}`)
                .then(res => setHeroes(res.data))
        } 
    }, [selectedRole]);

    const handleRoleFilter = (role) => {
        setSelectedRole(role);
    };

    // Handle form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewHero({ ...newHero, [name]: value });
    };

    // Add new hero
    const handleAddHero = () => {
        axios.post("http://localhost:8080/mlbb_heroes", newHero)
            .then(() => {
                setShowForm(false);
                resetForm();
                window.location.reload();
            })
            .catch(err => {
                if (err.response && err.response.status === 409) {
                    alert(err.response.data);
                } else {
                    alert("An error occurred while adding the hero.");
                }
            });
    };

    // Edit hero
    const handleEdit = (id) => {
        const hero = heroes.find(h => h.id === id);
        setEditHeroID(id);
        setNewHero(hero);
        setIsEditing(true);
        setShowForm(true);
    };

    // Update hero
    const handleUpdateHero = () => {
        axios.put(`http://localhost:8080/mlbb_heroes/${editHeroID}`, newHero)
            .then(() => {
                setShowForm(false);
                resetForm();
                window.location.reload();
            });
    };

    // Remove hero
    const handleRemove = (id) => {
        setHeroToDelete(id);
        setShowConfirmation(true);
    };

    // Confirm remove
    const confirmRemove = () => {
        axios.delete(`http://localhost:8080/mlbb_heroes/${heroToDelete}`)
            .then(() => {
                setShowConfirmation(false);
                setHeroToDelete(null);
                window.location.reload();
            });
    };

    // Close and reset
    const closeForm = () => {
        setShowForm(false);
        setIsEditing(false);
        setEditHeroID(null);
        resetForm();
    };

    const resetForm = () => {
        setNewHero({
            heroName: "",
            heroRole: "",
            heroDescription: "",
            heroImages: "",
        });
    };

    return (
        <div className={`heroes-page ${theme}`}>
            {/* Header */}
            <header className="header">
                <img src={mlbbBanner} alt="Mobile Legends" className="header-logo" />
                <nav className="nav-tabs">
                    <button className="nav-btn" onClick={() => setShowForm(true)}>
                        Add Hero +
                    </button>
                    {["All", "Assassin", "Fighter", "Mage", "Marksman", "Tank", "Support"].map((role) => (
                        <button key={role} className="nav-btn" onClick={() => handleRoleFilter(role)}>
                            {role}
                        </button>
                    ))}
                </nav>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <h1 className="region-title">Heroes - {selectedRole}</h1>
            </main>

            {/* Table */}
            <section className="results">
                <div className="results-section">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Hero ID</th>
                                <th>Hero Name</th>
                                <th>Role</th>
                                <th>Description</th>
                                {heroes.length > 0 && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {heroes.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center" }}>
                                        No heroes added yet.
                                    </td>
                                </tr>
                            ) : (
                                heroes.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>
                                            <div className="team-cell">
                                            <img
                                            src={row.heroImages}
                                            alt={row.heroName}
                                            className="team-icon"
                                            />
                                            <span>{row.heroName}</span>
                                        </div>
                                        </td>
                                        <td>{row.heroRole}</td>
                                        <td className="desc-cell">{row.heroDescription}</td>
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
                    <form
                        className="modal-content"
                        onSubmit={(e) => {
                            e.preventDefault();
                            isEditing ? handleUpdateHero() : handleAddHero();
                        }}
                        >
                        <h2>{isEditing ? "Edit Hero" : "Add New Hero"}</h2>

                        <div className="form-group">
                            <label>Hero Name:</label>
                            <input
                                name="heroName" required 
                                value={newHero.heroName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Role:</label>
                            <select
                                name="heroRole" required 
                                value={newHero.heroRole}
                                onChange={handleChange}
                            >
                                <option value="">Select Role</option>
                                <option value="Assassin">Assassin</option>
                                <option value="Fighter">Fighter</option>
                                <option value="Mage">Mage</option>
                                <option value="Marksman">Marksman</option>
                                <option value="Tank">Tank</option>
                                <option value="Support">Support</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <textarea
                                name="heroDescription"  required 
                                value={newHero.heroDescription}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Hero Image:</label>
                            <input
                                name="heroImages" required 
                                value={newHero.heroImages}
                                onChange={handleChange}
                            />
                            {newHero.heroImages && (
                                <div className="image-preview">
                                    <img src={newHero.heroImages} alt="Preview" className="preview-image" />
                                </div>
                            )}
                        </div>

                        <div className="modal-actions">
                            <button
                                className="add-btn" type = "submit"
                            >
                                {isEditing ? "Update" : "Add"}
                            </button>
                            <button className="back-btn" onClick={closeForm}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Confirm Delete Modal */}
            {showConfirmation && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to remove this hero?</p>
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

export default MLBBHeroesBE;
