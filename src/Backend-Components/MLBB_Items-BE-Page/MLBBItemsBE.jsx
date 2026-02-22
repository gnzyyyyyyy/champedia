import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MLBBItemsBE.css";
import mlbbBanner from "../../assets/images/mlbb_teams/mlbb_banner.png";

const MLBBItemsBE = ({theme}) => {
    const [items, setItems] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editItemID, setEditItemID] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const [selectedType, setSelectedType] = useState("All");

    const [newItem, setNewItem] = useState({
        itemName: "",
        itemType: "",
        itemDescription: "",
        itemImage: "",
    });

    //Load items from backend
    useEffect(() => {
        if(selectedType === "All"){
            axios.get("http://localhost:8080/mlbb_items")
                .then(res => setItems(res.data))
        } else {
            axios.get(`http://localhost:8080/mlbb_items/type/${selectedType}`)
                .then(res => setItems(res.data))
        }
    }, [selectedType]);

    const handleTypeFilter = (type) => {
        setSelectedType(type);
    }

    // Handle form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    // Add new hero
    const handleAddItem = () => {
        axios.post("http://localhost:8080/mlbb_items", newItem)
            .then(() => {
                setShowForm(false);
                resetForm();
                setSelectedType("All");
            })
            .catch(err => {
                if (err.response && err.response.status === 409) {
                    alert(err.response.data);
                } else {
                    alert("An error occurred while adding the item.");
                }
            })
    };

    // Edit hero
    const handleEdit = (id) => {
        const item = items.find(i => i.id === id);
        setEditItemID(id);
        setNewItem(item);
        setIsEditing(true);
        setShowForm(true);
    };

    // Update hero
    const handleUpdateItem = () => {
        axios.put(`http://localhost:8080/mlbb_items/${editItemID}`, newItem)
            .then(() => {
                setShowForm(false);
                resetForm();
                window.location.reload();
            });
    };

    // Remove hero
    const handleRemove = (id) => {
        setItemToDelete(id);
        setShowConfirmation(true);
    };

    // Confirm remove
    const confirmRemove = () => {
        axios.delete(`http://localhost:8080/mlbb_items/${itemToDelete}`)
            .then(() => {
                setShowConfirmation(false);
                setItemToDelete(null);
                window.location.reload();
            });
    };

    // Close and reset
    const closeForm = () => {
        setShowForm(false);
        setIsEditing(false);
        setEditItemID(null);
        resetForm();
    };

    const resetForm = () => {
        setNewItem({
            itemName: "",
            itemType: "",
            itemDescription: "",
            itemImage: "",
        });
    };

    return (
        <div className={`items-page ${theme}`}>
            {/* Header */}
            <header className="header">
                <img src={mlbbBanner} alt="Mobile Legends" className="header-logo" />
                <nav className="nav-tabs">
                    <button className="nav-btn" onClick={() => setShowForm(true)}>
                        Add Item +
                    </button>
                    {["Attack", "Defense", "Magic", "Movement", "Jungle", "Roaming", "All"].map((category) => (
                        <button key={category} className="nav-btn" onClick={() => handleTypeFilter(category)}>
                            {category}
                        </button>
                    ))}
                </nav>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <h1 className="region-title">Items - {selectedType}</h1>
            </main>

            {/* Table Section */}
            <section className="results">
                <div className="results-section">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Item ID</th>
                                <th>Item Name</th>
                                <th>Type</th>
                                <th>Description</th>
                                {items.length > 0 && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center" }}>
                                        No items added yet.
                                    </td>
                                </tr>
                            ) : (
                                items.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>
                                            <div className="team-cell">
                                            <img
                                            src={row.itemImage}
                                            alt={row.itemName}
                                            className="team-icon"
                                            />
                                            <span>{row.itemName}</span>
                                        </div>
                                        </td>
                                        <td>{row.itemType}</td>
                                        <td>{row.itemDescription}</td>
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
                    <form
                        className="modal-content"
                        onSubmit={(e) => {
                            e.preventDefault();
                            isEditing ? handleUpdateItem() : handleAddItem();
                        }}
                        >
                        <h2>{isEditing ? "Edit Item" : "Add New Item"}</h2>

                        <div className="form-group">
                        <label>Item Name:</label>
                        <input name="itemName" value={newItem.itemName} onChange={handleChange} required/>
                        </div>

                        <div className="form-group">
                            <label>Item Type:</label>
                            <select
                                name="itemType"
                                value={newItem.itemType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select Type --</option>
                                <option value="Attack">Attack</option>
                                <option value="Defense">Defense</option>
                                <option value="Magic">Magic</option>
                                <option value="Movement">Movement</option>
                                <option value="Jungle">Jungle</option>
                                <option value="Roaming">Roaming</option>
                            </select>
                        </div>

                        <div className="form-group">
                        <label>Description:</label>
                        <textarea name="itemDescription" value={newItem.itemDescription} onChange={handleChange} required/>
                        </div>

                        <div className="form-group">
                            <label>Item Image:</label>
                            <input
                                name="itemImage"
                                value={newItem.itemImage}
                                onChange={handleChange}
                                required
                            />
                            {newItem.itemImage && (
                                <div className="image-preview">
                                    <img src={newItem.itemImage} alt="Preview" />
                                </div>
                            )}
                        </div>

                        <div className="modal-actions">
                            <button
                                className="add-btn" type="submit"
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
                        <p>Are you sure you want to remove this item?</p>
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

export default MLBBItemsBE;