import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../config.js";
import axios from "axios";

function HealthTips() {
  const [tips, setTips] = useState([]);
  const [currentTips, setCurrentTips] = useState([]);
  const [message, setMessage] = useState("");
  const [lastFetchTime, setLastFetchTime] = useState(0);

  useEffect(() => {
    // Function to fetch tips
    const fetchTips = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/health-tips`, {
          params: { lastFetchTime: lastFetchTime },
        });

        if (response.data.message) {
          // Show the message when not enough time has passed
          setMessage(response.data.message);
        } else {
          // Set the new tips and update the last fetch time
          setTips(response.data.healthTips);
          setLastFetchTime(response.data.currentTime);
          setMessage(""); // Clear any previous message
        }
      } catch (error) {
        console.error("Error fetching health tips:", error);
      }
    };

    // Fetch tips initially
    fetchTips();

    // Set an interval to fetch new tips after every 10 seconds
    const interval = setInterval(() => {
      fetchTips();
    }, 10000); // 10 seconds in milliseconds

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, [lastFetchTime]);

  useEffect(() => {
    if (tips.length > 0) {
      setCurrentTips([tips[0], tips[1]]);
    }
  }, [tips]);

  return (
    <div className="health-tips-container">
      {currentTips.length > 0 ? (
        currentTips.map((tip, i) => (
          <div key={i} className="health-tip">
            {tip.tip}
          </div>
        ))
      ) : (
        <p>Loading tips...</p>
      )}
    </div>
  );
}

export default HealthTips;
