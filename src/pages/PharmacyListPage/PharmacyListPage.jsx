import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
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
    <div className="pharmacy-list-page">
      <h1>Pharmacies with the Selected Drug</h1>
      {pharmacies.length === 0 ? (
        <p>No pharmacies found for this drug.</p>
      ) : (
        <ul>
          {pharmacies.map((pharmacy) => (
            <Link to={`/pharmacies/${pharmacy.pharmId}`} key={pharmacy.pharmId}>
              <h2>{pharmacy.name}</h2>
              <p>{pharmacy.address}</p>
              {pharmacy.distanceText && (
                <p>Distance: {pharmacy.distanceText}</p>
              )}
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PharmacyListPage;
