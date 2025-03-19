import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import backarrow from "../../assets/images/arrow_back_16.png";
import rightarrow from "../../assets/images/chevron_right_16.png";
import axios from "axios";
import "./PharmacyListPage.scss";
import { BACKEND_URL } from "../../config";

function PharmacyListPage() {
  const [searchParams] = useSearchParams();
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  const drugId = searchParams.get("drugId");

  // Request user's location when the component loads
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error fetching user location:", error);
            alert(
              "Location access denied. Please enable location to get nearby pharmacies."
            );
            setUserLocation(null);
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
        setUserLocation(null);
      }
    };

    // Ask for permission when the user navigates to the page
    getUserLocation();
  }, []);

  // Fetch pharmacies when drugId or location changes
  useEffect(() => {
    const fetchPharmacies = async () => {
      if (!drugId) return;

      try {
        let url = `${BACKEND_URL}/pharmacies?drugId=${drugId}`;

        if (userLocation) {
          url += `&latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`;
        }

        const response = await axios.get(url);
        setPharmacies(response.data.pharmacies);
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, [drugId, userLocation]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pharmacy-list">
      <div className="pharmacy-list__header">
        <Link to={`/`} className="back-arrow-link">
          <img src={backarrow} alt="back icon" className="back-arrow" />
        </Link>
        <h2 className="pharmacy-list__title">
          Here are some pharmacies close to you:
        </h2>
      </div>
      {pharmacies.length === 0 ? (
        <p>No pharmacies found for this drug.</p>
      ) : (
        <div className="pharmacy-list__items">
          {pharmacies.map((pharmacy) => (
            <Link
              to={`/pharmacies/${pharmacy.pharmId}?drugId=${drugId}`}
              key={pharmacy.pharmId}
              className="pharmacy-list__card"
            >
              <div>
                <h3 className="pharmacy-list__name">{pharmacy.name}</h3>
                <p className="pharmacy-list__address">
                  Address: {pharmacy.address}
                </p>
                {pharmacy.distanceText && (
                  <p>Distance: {pharmacy.distanceText}</p>
                )}
              </div>
              <img src={rightarrow} alt="right arrow" className="right-arrow" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default PharmacyListPage;
