import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../config.js";
import axios from "axios";

const HealthTips = () => {
  const [tips, setTips] = useState([]);
  const [currentTips, setCurrentTips] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Fetch all health tips from the backend
    const fetchTips = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/health-tips`);
        setTips(response.data.healthTips);
        setCurrentTips(response.data.healthTips.slice(0, 2));
      } catch (error) {
        console.error("Error fetching health tips:", error);
      }
    };

    fetchTips();

    // Update tips every 24 hours (24 * 60 * 60 * 1000 ms)
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 2) % tips.length;
        setCurrentTips([tips[nextIndex], tips[(nextIndex + 1) % tips.length]]);
        return nextIndex;
      });
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
};

export default HealthTips;
