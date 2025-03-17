import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useParams, Link } from "react-router-dom";

function PharmacyDetailsPage() {
  const [pharmacy, setPharmacy] = useState(null);
  const { pharmId } = useParams();

  useEffect(() => {
    const fetchPharmacyDetails = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/pharmacies/${pharmId}`
        );

        setPharmacy(response.data.pharmacy);
      } catch (error) {
        console.error("Error fetching pharmacy details:", error);
      }
    };

    fetchPharmacyDetails();
  }, [pharmId]);

  if (!pharmacy) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pharmacy.name}</h1>
      <p>Address: {pharmacy.address}</p>
      <p>Contact: {pharmacy.phone || "Not available"}</p>
    </div>
  );
}

export default PharmacyDetailsPage;
