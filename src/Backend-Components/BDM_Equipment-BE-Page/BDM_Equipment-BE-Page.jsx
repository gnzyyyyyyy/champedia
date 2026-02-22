import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BDM_Equipment-BE-Page.css";

const BDMEquipmentBE = ({ theme }) => {

  /* =========================
     STATE
  ========================= */
  const [equipment, setEquipment] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editEquipmentId, setEditEquipmentId] = useState(null);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState(null);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    type: "",
    material: "",
    price: "",
    level: ""
  });

  /* ================= FETCH ================= */
  useEffect(() => {
    axios
      .get("http://localhost:8080/badminton/equipment")
      .then(res => setEquipment(res.data || []))
      .catch(err => console.error(err));
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddEquipment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/badminton/equipment",
        {
          ...form,
          price: Number(form.price)
        }
      );
      setEquipment([...equipment, res.data]);
      closeForm();
    } catch (err) {
      alert("Error adding equipment");
    }
  };

  const handleEdit = (e) => {
    setEditEquipmentId(e.equipmentId);
    setForm({
      name: e.name,
      brand: e.brand,
      type: e.type,
      material: e.material,
      price: e.price,
      level: e.level
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdateEquipment = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/badminton/equipment/${editEquipmentId}`,
        {
          ...form,
          price: Number(form.price)
        }
      );

      setEquipment(
        equipment.map(e =>
          e.equipmentId === editEquipmentId ? res.data : e
        )
      );
      closeForm();
    } catch (err) {
      alert("Error updating equipment");
    }
  };

  const handleRemove = (id) => {
    setEquipmentToDelete(id);
    setShowConfirmation(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/badminton/equipment/${equipmentToDelete}`
      );
      setEquipment(
        equipment.filter(e => e.equipmentId !== equipmentToDelete)
      );
      setShowConfirmation(false);
      setEquipmentToDelete(null);
    } catch (err) {
      alert("Error deleting equipment");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditEquipmentId(null);
    setForm({
      name: "",
      brand: "",
      type: "",
      material: "",
      price: "",
      level: ""
    });
  };

  /* ================= JSX ================= */
  return (
    <div className={`eq-teams-page ${theme}`}>

      <h1 className="eq-page-title">Badminton Equipment</h1>

      <button className="eq-add-btn" onClick={() => setShowForm(true)}>
        Add Equipment +
      </button>

      <table className="eq-data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Type</th>
            <th>Material</th>
            <th>Level</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {equipment.length === 0 ? (
            <tr>
              <td colSpan="8" align="center">
                No equipment found.
              </td>
            </tr>
          ) : (
            equipment.map(e => (
              <tr key={e.equipmentId}>
                <td>{e.equipmentId}</td>
                <td>{e.name}</td>
                <td>{e.brand}</td>
                <td>{e.type}</td>
                <td>{e.material}</td>
                <td>{e.level}</td>
                <td>{e.price}</td>
                <td>
                  <button
                    className="eq-edit-btn"
                    onClick={() => handleEdit(e)}
                  >
                    Edit
                  </button>
                  <button
                    className="eq-remove-btn"
                    onClick={() => handleRemove(e.equipmentId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ===== FORM MODAL ===== */}
      {showForm && (
        <div className="eq-modal-overlay">
          <div className="eq-modal-content">
            <h2>{isEditing ? "Edit Equipment" : "Add Equipment"}</h2>

            <input
              name="name"
              placeholder="Equipment Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              name="brand"
              placeholder="Brand"
              value={form.brand}
              onChange={handleChange}
            />
            <input
              name="type"
              placeholder="Type (Racket, Shoes, Shuttlecock)"
              value={form.type}
              onChange={handleChange}
            />
            <input
              name="material"
              placeholder="Material"
              value={form.material}
              onChange={handleChange}
            />
            <input
              name="level"
              placeholder="Level (Beginner / Professional)"
              value={form.level}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
            />

            <div className="eq-modal-actions">
              <button
                className="eq-add-btn"
                onClick={isEditing ? handleUpdateEquipment : handleAddEquipment}
              >
                {isEditing ? "Update" : "Add"}
              </button>
              <button className="eq-back-btn" onClick={closeForm}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRM ===== */}
      {showConfirmation && (
        <div className="eq-modal-overlay">
          <div className="eq-modal-content">
            <p>Are you sure you want to delete this equipment?</p>
            <div className="eq-modal-actions">
              <button className="eq-remove-btn" onClick={confirmRemove}>
                Yes
              </button>
              <button
                className="eq-back-btn"
                onClick={() => setShowConfirmation(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BDMEquipmentBE;
