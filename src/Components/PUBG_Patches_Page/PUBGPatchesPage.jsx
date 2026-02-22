import React, { useState, useEffect } from "react";
import "./PUBGPatchesPage.css";
import axios from "axios";
import mlbbBanner from "../../assets/images/pubgnew2.png";

const PUBGPatchesPage= ({ theme }) => {
    const [patches, setPatches] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/pubg_patches")
            .then((res) => {
                const sorted = res.data.sort((a, b) => new Date(b.patchDate) - new Date(a.patchDate));
                setPatches(sorted);
            });
    }, []);
    return (
        <div className={`pubg-patches ${theme}`}>

        {/* === HEADER === */}
        <header className="patches-header">
            <img src={mlbbBanner} alt="Mobile Legends" className="patches-header-logo" />
        </header>

        {/* === OVERVIEW SECTION === */}
        <section className="patches-overview">
            <h2 className="patches-title">Patch Overview</h2>
            <div className="patches-overview-box">
            <p>
                Patches are regular game updates that shape Mobile Legends’ evolving meta through balance adjustments, bug fixes, and new content.
            </p>
            <p><strong>These updates usually include:</strong></p>
            <ul>
                <li>Guns</li>
                <li>Maps</li>
                <li>Events</li>
                <li>Bug Adjustments</li>
            </ul>
            </div>
        </section>

        {/* === MAIN TITLE === */}
        <main className="patches-main">
            <h1 className="patches-main-title">Recent Patches</h1>
        </main>

        {/* === PATCHES TABLE === */}
        <section className="patches-table-section">
            <div className="patches-table-wrapper">
            <table className="patches-table">
                <thead>
                <tr>
                    <th>Patch</th>
                    <th>Release Date</th>
                    <th>Highlights</th>
                </tr>
                </thead>
                <tbody>
                {patches.map((row, index) => (
                    <tr key={index}>
                    <td>{row.patchVersion}</td>
                    <td>{row.patchDate}</td>
                    <td>
                        {row.patchHighlights.split("\n").map((line, i) => (
                        <div key={i}>{line}</div>
                        ))}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </section>
        </div>
    );
};

export default PUBGPatchesPage;

