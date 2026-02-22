import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./MGP_News.css";

import img1 from "../../../assets/images/mgp_index/mgp_highlight/h_1.png";
import img2 from "../../../assets/images/mgp_index/mgp_highlight/h_2.png";
import img3 from "../../../assets/images/mgp_index/mgp_highlight/h_3.png";
import img4 from "../../../assets/images/mgp_index/mgp_highlight/h_4.png";

// DATA NEWS STATIC (tanpa fetch)
const newsItems = [
  { id: "1", title: "News 1", image: img1, path: "/MGP_NewsDetail/1" },
  { id: "2", title: "News 2", image: img2, path: "/MGP_NewsDetail/2" },
  { id: "3", title: "News 3", image: img3, path: "/MGP_NewsDetail/3" },
  { id: "4", title: "News 4", image: img4, path: "/MGP_NewsDetail/4" }
];

const MGP_News = ({ theme }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`highlight-section ${theme === "dark" ? "dark" : ""}`}>
      <div className="highlight-header">
        <p className="highlight-text">Latest News</p>
      </div>

      <div className="highlight-wrapper">

        {/* Tombol kiri */}
        <button className="scroll-button left" onClick={() => scroll("left")}>
          &#10094;
        </button>

        {/* Container scroll */}
        <div className="scrollContainer" ref={scrollRef}>
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="card"
              onClick={() => navigate(item.path)}
            >
              <img src={item.image} alt={item.title} />
              <div className="cardLabel">{item.title}</div>
            </div>
          ))}
        </div>

        {/* Tombol kanan */}
        <button className="scroll-button right" onClick={() => scroll("right")}>
          &#10095;
        </button>

      </div>
    </div>
  );
};

export default MGP_News;
