import React, { useState, useEffect } from "react";
import "./VALOMapsBE.css"; 
import axios from "axios";
import valoBanner from "../../assets/images/valo_logo.png";

const VALOMapsBE = ({ theme }) => {
    const [maps, setMaps] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editMapID, setEditMapID] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [mapToDelete, setMapToDelete] = useState(null);

    const [newMap, setNewMap] = useState({
        mapName: "",
        mapImages: "",
        mapLayout: "",
    });

    useEffect(() => {
        axios
            .get("http://localhost:8080/valo_maps")
            .then((res) => setMaps(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMap({ ...newMap, [name]: value });
    };

    const handleAddMap = () => {
        axios.post("http://localhost:8080/valo_maps", newMap)
            .then(() => {
                setShowForm(false);
                resetForm();
                window.location.reload();
            })
            .catch(err => {
            if (err.response && err.response.status === 409) {
                alert(err.response.data);
            } else {
                alert("An error occurred while adding the map.");
            }
        });
    };

    const handleEdit = (id) => {
        const map = maps.find(m => m.id === id);
        if (map) {
            setEditMapID(id);
            setNewMap(map);
            setIsEditing(true);
            setShowForm(true);
        }
    };

    const handleUpdateMap = () => {
        axios.put(`http://localhost:8080/valo_maps/${editMapID}`, newMap)
            .then(() => {
                setShowForm(false);
                resetForm();
                window.location.reload();
            })
    };

    const handleRemove = (id) => {
        setMapToDelete(id);
        setShowConfirmation(true);
    };

    const confirmRemove = () => {
        axios.delete(`http://localhost:8080/valo_maps/${mapToDelete}`)
            .then(() => {
                setShowConfirmation(false);
                setMapToDelete(null);
                window.location.reload();
            });
    };

    const closeForm = () => {
        setShowForm(false);
        setIsEditing(false);
        setEditMapID(null);
        resetForm();
    };

    const resetForm = () => {
        setNewMap({
            mapName: "",
            mapImages: "",
            mapLayout: "",
        });
    };

    return (
        <div className={`maps-page ${theme}`}>

            {/* Header */}
            <header className="header">
                <img src={valoBanner} alt="Valorant" className="header-logo" />

                <nav className="nav-tabs">
                    <button className="nav-btn" onClick={() => setShowForm(true)}>
                        Add Map +
                    </button>
                </nav>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <h1 className="region-title">Maps</h1>
            </main>

            {/* Table */}
            <section className="results">
                <div className="results-section">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Map Image</th>
                                <th>Layout</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {maps.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: "center" }}>
                                        No maps added yet.
                                    </td>
                                </tr>
                            ) : (
                                maps.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>

                                        <td>
                                            {row.mapImages ? (
                                                <img src={row.mapImages} className="map-icon" alt="map" />
                                            ) : "—"}
                                        </td>

                                        <td>
                                            {row.mapLayout ? (
                                                <img src={row.mapLayout} className="map-icon" alt="layout" />
                                            ) : "—"}
                                        </td>

                                        <td>{row.mapName}</td>

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

            {/* Add / Edit Modal */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content large-modal">
                        <h2>{isEditing ? "Edit Map" : "Add New Map"}</h2>

                        <div className="form-group">
                            <label>Map Name:</label>
                            <input
                                name="mapName"
                                value={newMap.mapName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Map Image:</label>
                            <input name="mapImages" value={newMap.mapImages} onChange={handleChange} />
                            {newMap.mapImages && (
                                <div className="logo-preview">
                                    <img src={newMap.mapImages} alt="map preview" />
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Layout Image:</label>
                            <input name="mapLayout" value={newMap.mapLayout} onChange={handleChange} />
                            {newMap.mapLayout && (
                                <div className="logo-preview">
                                    <img src={newMap.mapLayout} alt="layout preview" />
                                </div>
                            )}
                        </div>

                        <div className="modal-actions">
                            <button
                                className="add-btn"
                                onClick={isEditing ? handleUpdateMap : handleAddMap}
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

            {/* Confirm Delete */}
            {showConfirmation && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to remove this map?</p>

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

export default VALOMapsBE;
