import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BDM_Equipment.css";

const BDM_Equipment = ({ theme }) => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/badminton/equipment")
      .then((res) => setEquipment(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={`bdm-equipment-page ${theme}`}>
      <h1 className="bdm-title">Badminton Equipment</h1>

      <div className="table-wrapper">
        <table className="bdm-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Type</th>
              <th>Material</th>
              <th>Level</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {equipment.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty">
                  No equipment found
                </td>
              </tr>
            ) : (
              equipment.map((e) => (
                <tr key={e.equipmentId || e._id}>
                  <td className="name">{e.name}</td>
                  <td>{e.brand}</td>
                  <td>{e.type}</td>
                  <td>{e.material}</td>
                  <td>
                    <span className={`level ${e.level?.toLowerCase()}`}>
                      {e.level}
                    </span>
                  </td>
                  <td className="price">
                    Rp {Number(e.price).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BDM_Equipment;
