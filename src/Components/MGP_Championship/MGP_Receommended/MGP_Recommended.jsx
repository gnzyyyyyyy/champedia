import React, { useEffect, useRef, useState } from "react";
import "./MGP_Recommended.css";

const MGP_Recommended = ({ theme }) => {
  const scrollRef = useRef(null);
    const [highlights, setHighlights] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:8080/highlight")
        .then((res) => res.json())
        .then((data) => setHighlights(data))
        .catch((err) => console.error("Fetch highlight error:", err));
    }, []);
  
    const scroll = (direction) => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: direction === "left" ? -300 : 300,
          behavior: "smooth",
        });
      }
    };
  
    const openYoutube = (url) => {
      window.open(url, "_blank");
    };
  
    return (
      <div className={`HI_highlight-section ${theme === "dark" ? "dark" : ""}`}>
        <div className="HI_highlight-header">
          <p className="HI_highlight-text">Latest Highlight</p>
        </div>
  
        <div className="HI_highlight-wrapper">
          <button
            className="HI_scroll-button HI_left"
            onClick={() => scroll("left")}
          >
            &#10094;
          </button>
  
          <div className="HI_scrollContainer" ref={scrollRef}>
            {highlights.map((item) => (
              <div
                key={item.id}
                className="HI_card"
                onClick={() => openYoutube(item.highlightLinkVideo)}
              >
                <img
                  src={item.highlightImage}
                  alt={item.highlightTitle}
                />
                <div className="HI_cardLabel">
                  {item.highlightTitle}
                </div>
              </div>
            ))}
          </div>
  
          <button
            className="HI_scroll-button HI_right"
            onClick={() => scroll("right")}
          >
            &#10095;
          </button>
        </div>
      </div>
    );
  };

export default MGP_Recommended;
