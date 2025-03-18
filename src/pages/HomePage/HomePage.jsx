import React from "react";
import "./HomePage.scss";
import SearchBar from "../../components/SearchBar/SearchBar";
import HealthTips from "../../components/HealthTips/HealthTips.jsx";

function HomePage() {
  return (
    <div>
      <div className="home__search">
        <SearchBar />
      </div>
      <div className="home__health-tips">
        <HealthTips />
      </div>
    </div>
  );
}

export default HomePage;
