import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../config.js";
import axios from "axios";

function HealthTips() {
  const [tips, setTips] = useState([]);
  const [currentTips, setCurrentTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get("/api/health-tips");
        setTips(response.data.healthTips);
        setCurrentTips(response.data.healthTips.slice(0, 2));
      } catch (error) {
        console.error("Error fetching health tips:", error);
      }
    };

    fetchTips();

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 2) % tips.length;
      setCurrentTips([
        tips[currentIndex],
        tips[(currentIndex + 1) % tips.length],
      ]);
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [tips]);

  return (
    <div className="health-tips-container">
      {currentTips.map((tip, i) => (
        <div key={i} className="health-tip">
          {tip.tip}
        </div>
      ))}
    </div>
  );
}

export default HealthTips;
