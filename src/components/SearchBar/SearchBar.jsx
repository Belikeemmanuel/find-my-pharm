import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import searchIcon from "../../assets/images/search_16.png";
import "./SearchBar.scss";
import { BACKEND_URL } from "../../config";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/drugs`, {
        params: { query },
      });
      setSuggestions(response.data.drugs);
    } catch (error) {
      console.error("Error fetching drug suggestions:", error);
      setSuggestions([]);
    }
  };

  // Debounce the request to reduce the number of calls to the backend
  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  useEffect(() => {
    debouncedFetchSuggestions(query);
    return () => debouncedFetchSuggestions.cancel(); // Clean up on unmount
  }, [query]);

  const handleDrugClick = (drugId) => {
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
          onClick={() => fetchSuggestions(query)}
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
