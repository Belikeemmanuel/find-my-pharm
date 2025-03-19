import { useState, useEffect } from "react";
import axios from "axios";
import "./PharmacyDetailsPage.scss";
import { BACKEND_URL } from "../../config";
import backarrow from "../../assets/images/arrow_back_16.png";
import homeicon from "../../assets/images/home_16.png";
import { useParams, useSearchParams, Link } from "react-router-dom";

function PharmacyDetailsPage() {
  const [pharmacy, setPharmacy] = useState(null);
  const { pharmId } = useParams();
  const [searchParams] = useSearchParams();
  const drugId = searchParams.get("drugId");

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
    <div className="pharmacy-details">
      <div className="pharmacy-details__top">
        <div className="pharmacy-details__back-button">
          <Link
            to={`/pharmacies?drugId=${drugId}`}
            className="pharmacy-details__back-arrow-link"
          >
            <img src={backarrow} alt="back icon" className="back-arrow" />
            <h2 className="pharmacy-details__back-text">Back</h2>
          </Link>
        </div>
        <div className="pharmacy-details__home-button">
          <Link to={`/`} className="pharmacy-details__home-icon-link">
            <img src={homeicon} alt="home icon" className="home-icon" />
          </Link>
        </div>
      </div>
      <div className="pharmacy-details__card">
        <h1 className="pharmacy-details__header">{pharmacy.name}</h1>

        <p className="pharmacy-details__address">
          <span>Address: </span>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              pharmacy.address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pharmacy-details__link"
          >
            {pharmacy.address}
          </a>
        </p>

        <p className="pharmacy-details__phone">
          <span>Contact: </span>
          {pharmacy.phone ? (
            <a
              href={`tel:${pharmacy.phone}`}
              className="pharmacy-details__link"
            >
              {pharmacy.phone}
            </a>
          ) : (
            "Not available"
          )}
        </p>

        <p className="pharmacy-details__email">
          <span>Email: </span>
          {pharmacy.email ? (
            <a
              href={`mailto:${pharmacy.email}`}
              className="pharmacy-details__link"
            >
              {pharmacy.email}
            </a>
          ) : (
            "Not available"
          )}
        </p>

        <div className="pharmacy-details__timestamp">
          <p className="pharmacy-details__time">
            <span>Opens: </span>
            {pharmacy.opening_time}
          </p>
          <p className="pharmacy-details__time">
            <span>Closes: </span>
            {pharmacy.closing_time}
          </p>
        </div>

        <p className="pharmacy-details__website">
          <span>Website: </span>
          {pharmacy.website ? (
            <a href={pharmacy.website} className="pharmacy-details__link">
              {pharmacy.website}
            </a>
          ) : (
            "Not available"
          )}
        </p>
      </div>
    </div>
  );
}

export default PharmacyDetailsPage;
