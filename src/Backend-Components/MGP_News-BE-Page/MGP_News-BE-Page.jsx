import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./MGP_News-BE-Page.css";

import mlbbBanner from '../../assets/images/mgp_index/mgp_banner/mgp_bg.png';

const MGPNewsBE = ({ theme }) => {
  const [news, setNews] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);

  const [newNews, setNewNews] = useState({
    newsTitle: "",
    newsContent: "",
    newsDate: "",
    newsImage: "",
  });

  //Fetch
  useEffect(() => {
    axios
      .get("http://localhost:8080/news")
      .then((res) => setNews(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNews({ ...newNews, [name]: value });
  };

  //Add
  const handleAddNews = async () => {
    try {
      const res = await axios.post("http://localhost:8080/news", newNews);

      setNews([...news, res.data]);
      alert(`News "${res.data.newsTitle}" added!`);

      closeForm();
    } catch (err) {
      alert("Failed to add news.");
    }
  };

  //Edit
  const handleEdit = (id) => {
    const selected = news.find((n) => n.newsID === id);
    if (selected) {
      setEditID(id);
      setNewNews(selected);
      setIsEditing(true);
      setShowForm(true);
    }
  };

  //Update
  const handleUpdateNews = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/news/${editID}`,
        newNews
      );

      setNews(news.map((n) => (n.newsID === editID ? res.data : n)));

      alert("News updated!");
      closeForm();
    } catch (err) {
      alert("Failed to update news.");
    }
  };

  //Delete
  const handleRemove = (id) => {
    setNewsToDelete(id);
    setShowConfirmation(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(`http://localhost:8080/news/${newsToDelete}`);

      setNews(news.filter((n) => n.newsID !== newsToDelete));
      setShowConfirmation(false);

      alert("News deleted!");
    } catch (err) {
      alert("Failed to delete news.");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditID(null);

    setNewNews({
      newsTitle: "",
      newsContent: "",
      newsDate: "",
      newsImage: "",
    });
  };

  return (
    <div className={`teams-page ${theme}`}>
      <header className="header">
        <img src={mlbbBanner} alt="Banner" className="header-logo" />

        <nav className="nav-tabs">
          <button className="nav-btn" onClick={() => setShowForm(true)}>
            Add News +
          </button>

          {["MotoGP", "Moto2", "Moto3", "Legends", "Retired", "All"].map(
            (c) => (
              <button key={c} className="nav-btn">
                {c}
              </button>
            )
          )}
        </nav>
      </header>

      <main className="main-content">
        <h1 className="region-title">News</h1>
      </main>

      <section className="tournament-results">
        <div className="results-section">
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Date</th>
                <th>Image</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {news.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No news available.
                  </td>
                </tr>
              ) : (
                news.map((n) => (
                  <tr key={n.newsID}>
                    <td>{n.newsID}</td>
                    <td>{n.newsTitle}</td>
                    <td>{n.newsDate}</td>

                    <td>
                      {n.newsImage ? (
                        <img
                          src={n.newsImage}
                          alt="preview"
                          className="team-icon"
                        />
                      ) : (
                        <span style={{ opacity: 0.5 }}>No image</span>
                      )}
                    </td>

                    <td>{n.newsContent}</td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(n.newsID)}
                      >
                        Edit
                      </button>

                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(n.newsID)}
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

      {/* MODAL ADD / EDIT */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEditing ? "Edit News" : "Add News"}</h2>

            <div className="form-group">
              <label>Title:</label>
              <input
                name="newsTitle"
                value={newNews.newsTitle}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Date:</label>
              <input
                name="newsDate"
                value={newNews.newsDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Image URL:</label>
              <input
                name="newsImage"
                value={newNews.newsImage}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Content:</label>
              <textarea
                name="newsContent"
                value={newNews.newsContent}
                onChange={handleChange}
              />
            </div>

            <div className="modal-actions">
              <button
                className="add-btn"
                onClick={isEditing ? handleUpdateNews : handleAddNews}
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

      {/* DELETE CONFIRM */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this news?</p>

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

export default MGPNewsBE;
