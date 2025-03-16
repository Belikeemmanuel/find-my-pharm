import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/images/search_16.png";
import "./SearchBar.scss";
function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query) return;

    try {
      // Call the /drugs endpoint with the query parameter
      const response = await axios.get(`${BACKEND_URL}/drugs`, {
        params: { query }, // Pass the query as a parameter
      });
      setSuggestions(response.data.drugs); // Assuming the response has a `drugs` field
    } catch (error) {
      console.error("Error fetching drug suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleDrugClick = (drugId) => {
    // Navigate to the PharmacyListPage with the selected drugId
    navigate(`/pharmacies?drugId=${drugId}`);
  };

  return (
    <div>
      <div className="search">
        <input
          type="text"
          className="search__input"
          placeholder="What drug are you looking for?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="Search"
          className="search__icon"
          onClick={handleSearch}
        />
      </div>

      {/* Display drug suggestions */}
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((drug) => (
            <div
              key={drug.drugId}
              className="suggestion-item"
              onClick={() => handleDrugClick(drug.drugId)}
            >
              {drug.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
