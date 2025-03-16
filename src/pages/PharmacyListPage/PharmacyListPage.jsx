import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./PharmacyListPage.scss";
import { BACKEND_URL } from "../../config";

function PharmacyListPage() {
  const [searchParams] = useSearchParams();
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null); // Store user's location

  const drugId = searchParams.get("drugId");

  // Fetch user's location using the Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching user location:", error);
          setUserLocation(null); // Fallback if location access is denied
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setUserLocation(null); // Fallback if geolocation is not supported
    }
  }, []);

  // Fetch pharmacies based on drugId and user location
  useEffect(() => {
    const fetchPharmacies = async () => {
      if (!drugId) return; // Exit if drugId is not provided

      try {
        let url = `${BACKEND_URL}/pharmacies?drugId=${drugId}`;

        // Add user location to the API call if available
        if (userLocation) {
          url += `&latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`;
        }

        const response = await axios.get(url);
        setPharmacies(response.data.pharmacies); // Assuming the response has a `pharmacies` field
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, [drugId, userLocation]); // Re-fetch when drugId or userLocation changes

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
            <li key={pharmacy.pharmId}>
              <h2>{pharmacy.name}</h2>
              <p>{pharmacy.address}</p>
              {pharmacy.distanceText && (
                <p>Distance: {pharmacy.distanceText}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PharmacyListPage;
