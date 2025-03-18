import { useState, useEffect, useRef } from "react";
import { BACKEND_URL } from "../../config.js";
import axios from "axios";
import hearticon from "../../assets/images/heart_check_16dp.png";
import "./HealthTips.scss";

function HealthTips() {
  const [tips, setTips] = useState([]);
  const [currentTips, setCurrentTips] = useState([]);
  const [message, setMessage] = useState("");
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
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
          setMessage("");
        }
      } catch (error) {
        console.error("Error fetching health tips:", error);
      }
    };

    fetchTips();

    // Set an interval to fetch new tips after every 10 seconds
    const interval = setInterval(() => {
      fetchTips();
    }, 10000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, [lastFetchTime]);

  useEffect(() => {
    if (tips.length > 0) {
      setCurrentTips([tips[0], tips[1]]);
    }
  }, [tips]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger re-render to retrigger animation
          setCurrentTips([...tips.slice(0, 2)]);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [tips]);

  return (
    <div className="health-tips">
      <h1 className="health-tips__header">Daily Health Tips</h1>
      <img src={hearticon} alt="heart icon" className="health-tips__icon" />
      {currentTips.length > 0 ? (
        currentTips.map((tip, i) => (
          <h2 key={`${tip.tip}-${i}`} className="health-tips__item">
            - {tip.tip}
          </h2>
        ))
      ) : (
        <p>Loading tips...</p>
      )}
    </div>
  );
}

export default HealthTips;
