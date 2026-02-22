import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CRCardsBE.css";
import crLogo from "../../assets/images/cr_logo.png";

const CRCardsBE = ({ theme }) => {
    const [cards, setCards] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editCardID, setEditCardID] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [cardToDelete, setCardToDelete] = useState(null);

    const [selectedType, setSelectedType] = useState("All");

    const [newCard, setNewCard] = useState({
        cardName: "",
        cardType: "",
        cardRarity: "",
        cardCost: "",
        heroDescription: "",
        cardImages: "",
    });

    // Load cards
    useEffect(() => {
        if (selectedType === "All") {
            axios.get("http://localhost:8080/cr_cards")
                .then(res => setCards(res.data));
        } else {
            axios.get(`http://localhost:8080/cr_cards/type/${selectedType}`)
                .then(res => setCards(res.data));
        }
    }, [selectedType]);

    const handleTypeFilter = (type) => {
        setSelectedType(type);
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCard({ ...newCard, [name]: value });
    };

    // Add card
    const handleAddCard = () => {
        axios.post("http://localhost:8080/cr_cards", newCard)
            .then(() => {
                setShowForm(false);
                resetForm();
                window.location.reload();
            })
            .catch(err => {
                if (err.response) {
                    alert(err.response.data);
                } else {
                    alert("An error occurred while adding the card.");
                }
            });
    };

    // Edit card
    const handleEdit = (id) => {
        const card = cards.find(c => c.id === id);
        setEditCardID(id);
        setNewCard(card);
        setIsEditing(true);
        setShowForm(true);
    };

    // Update card
    const handleUpdateCard = () => {
        axios.put(`http://localhost:8080/cr_cards/${editCardID}`, newCard)
            .then(() => {
                setShowForm(false);
                resetForm();
                window.location.reload();
            })
            .catch(err => {
                if (err.response) {
                    alert(err.response.data);
                } else {
                    alert("Server is unreachable.");
                }
            });
    };

    // Remove card
    const handleRemove = (id) => {
        setCardToDelete(id);
        setShowConfirmation(true);
    };

    // Confirm remove
    const confirmRemove = () => {
        axios.delete(`http://localhost:8080/cr_cards/${cardToDelete}`)
            .then(() => {
                setShowConfirmation(false);
                setCardToDelete(null);
                window.location.reload();
            });
    };

    const closeForm = () => {
        setShowForm(false);
        setIsEditing(false);
        setEditCardID(null);
        resetForm();
    };

    const resetForm = () => {
        setNewCard({
            cardName: "",
            cardType: "",
            cardRarity: "",
            cardCost: "",
            heroDescription: "",
            cardImages: "",
        });
    };

    return (
        <div className={`cards-page ${theme}`}>
            {/* Header */}
            <header className="header">
                <img src={crLogo} alt="Clash Royale" className="header-logo" />
                <nav className="nav-tabs">
                    <button className="nav-btn" onClick={() => setShowForm(true)}>
                        Add Card +
                    </button>
                    {["All", "Troop", "Spell", "Building"].map(type => (
                        <button key={type} className="nav-btn" onClick={() => handleTypeFilter(type)}>
                            {type}
                        </button>
                    ))}
                </nav>
            </header>

            {/* Main */}
            <main className="main-content">
                <h1 className="region-title">Cards - {selectedType}</h1>
            </main>

            {/* Table */}
            <section className="results">
                <div className="results-section">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Card ID</th>
                                <th>Card Name</th>
                                <th>Type</th>
                                <th>Rarity</th>
                                <th>Cost</th>
                                <th>Description</th>
                                {cards.length > 0 && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {cards.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: "center" }}>
                                        No cards added yet.
                                    </td>
                                </tr>
                            ) : (
                                cards.map(row => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>
                                            <div className="team-cell">
                                                <img src={row.cardImages} alt={row.cardName} className="team-icon" />
                                                <span>{row.cardName}</span>
                                            </div>
                                        </td>
                                        <td>{row.cardType}</td>
                                        <td>{row.cardRarity}</td>
                                        <td>{row.cardCost}</td>
                                        <td className="desc-cell">{row.heroDescription}</td>
                                        <td>
                                            <button className="edit-btn" onClick={() => handleEdit(row.id)}>
                                                Edit
                                            </button>
                                            <button className="remove-btn" onClick={() => handleRemove(row.id)}>
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
                        <h2>{isEditing ? "Edit Card" : "Add New Card"}</h2>

                        <div className="form-group">
                            <label>Card Name:</label>
                            <input name="cardName" value={newCard.cardName} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Type:</label>
                            <select name="cardType" value={newCard.cardType} onChange={handleChange}>
                                <option value="">Select Type</option>
                                <option value="Troop">Troop</option>
                                <option value="Spell">Spell</option>
                                <option value="Building">Building</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Rarity:</label>
                            <select name="cardRarity" value={newCard.cardRarity} onChange={handleChange}>
                                <option value="">Select Rarity</option>
                                <option value="Common">Common</option>
                                <option value="Rare">Rare</option>
                                <option value="Epic">Epic</option>
                                <option value="Legendary">Legendary</option>
                                <option value="Champion">Champion</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Elixir Cost:</label>
                            <input type="number" name="cardCost" value={newCard.cardCost} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <textarea name="heroDescription" value={newCard.heroDescription} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Card Image:</label>
                            <input name="cardImages" value={newCard.cardImages} onChange={handleChange} />
                            {newCard.cardImages && (
                                <div className="image-preview">
                                    <img src={newCard.cardImages} alt="Preview" className="preview-image" />
                                </div>
                            )}
                        </div>

                        <div className="modal-actions">
                            <button className="add-btn" onClick={isEditing ? handleUpdateCard : handleAddCard}>
                                {isEditing ? "Update" : "Add"}
                            </button>
                            <button className="back-btn" onClick={closeForm}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete */}
            {showConfirmation && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to remove this card?</p>
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

export default CRCardsBE;
