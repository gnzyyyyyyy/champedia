import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MLBBPatchesBE.css";

import mlbbBanner from "../../assets/images/mlbb_teams/mlbb_banner.png";

const MLBBPatchesBE = () => {
  const [patches, setPatches] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editPatchID, setEditPatchID] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [patchToDelete, setPatchToDelete] = useState(null);

  const [newPatch, setNewPatch] = useState({
    patchVersion: "",
    patchDate: "",
    patchHighlights: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/mlbb_patches")
      .then((response) => setPatches(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPatch({ ...newPatch, [name]: value });
  };

  const handleAddPatch = () => {
    axios
      .post("http://localhost:8080/mlbb_patches", newPatch)
      .then(() => {
        setShowForm(false);
        resetForm();
        window.location.reload();
      })
  };

  const handleEdit = (id) => {
    const patch = patches.find(p => p.id === id);
      setEditPatchID(id);
      setNewPatch(patch);
      setIsEditing(true);
      setShowForm(true);
  };

  const handleUpdatePatch = () => {
    axios
      .put(`http://localhost:8080/mlbb_patches/${editPatchID}`, newPatch)
      .then(() => {
        setShowForm(false);
        resetForm();
        window.location.reload();
      })
  };

  const handleRemove = (id) => {
    setPatchToDelete(id);
    setShowConfirmation(true);
  };

  const confirmRemove = () => {
    axios
      .delete(`http://localhost:8080/mlbb_patches/${patchToDelete}`)
      .then(() => {
        setShowConfirmation(false);
        setPatchToDelete(null);
        window.location.reload();
      })
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditPatchID(null);
    resetForm();
  };

  const resetForm = () => {
    setNewPatch({
      patchVersion: "",
      patchDate: "",
      patchHighlights: "",
    });
  };

  return (
    <div className="patches-page">
      {/* Header */}
      <div className="header">
        <img src={mlbbBanner} alt="MLBB Banner" className="header-logo" />
        <div className="nav-tabs">
          <button className="nav-btn" onClick={() => setShowForm(true)}>
            Add Patch
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2 className="region-title">Manage Patches</h2>

        <table className="results-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patch</th>
              <th>Release Date</th>
              <th>Highlights</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patches.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No patches added yet.
                </td>
              </tr>
            ) : (
              patches.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.patchVersion}</td>
                  <td>{p.patchDate}</td>
                  <td className="highlights-cell">
                    {(p.patchHighlights ?? "")
                      .split("\n")
                      .map((line, i) => (
                        <div key={i}>- {line}</div>
                      ))}
                  </td>
                  <td>
                    <button className="add-btn" onClick={() => handleEdit(p.id)}>
                      Edit
                    </button>
                    <button className="back-btn" onClick={() => handleRemove(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEditing ? "Edit Patch" : "Add Patch"}</h2>

            <div className="form-group">
              <label>Patch Version</label>
              <input
                type="text"
                name="patchVersion"
                value={newPatch.patchVersion}
                onChange={handleChange}
                placeholder="e.g., Patch 1.1"
              />
            </div>

            <div className="form-group">
              <label>Release Date</label>
              <input
                type="text"
                name="patchDate"
                value={newPatch.patchDate}
                onChange={handleChange}
                placeholder="e.g., September 5, 2025"
              />
            </div>

            <div className="form-group">
              <label>Highlights (Use new line for each point)</label>
              <textarea
                name="patchHighlights"
                rows="5"
                value={newPatch.patchHighlights}
                onChange={handleChange}
                placeholder="- Hero Adjustments&#10;- Item Changes&#10;- Bug Fixes"
              />
            </div>

            <div className="modal-actions">
              <button
                className="add-btn"
                onClick={isEditing ? handleUpdatePatch : handleAddPatch}
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

      {/* Delete Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this patch?</p>
            <div className="modal-actions">
              <button className="back-btn" onClick={confirmRemove}>
                Yes
              </button>
              <button className="add-btn" onClick={() => setShowConfirmation(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MLBBPatchesBE;
