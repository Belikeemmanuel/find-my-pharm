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
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      setErrorMessage("Please type in a drug"); // No query, no error
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/drugs`, {
        params: { query },
      });
      if (response.data.drugs.length === 0) {
        setSuggestions([]);
      } else {
        setSuggestions(response.data.drugs);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error fetching drug suggestions:", error);
      setErrorMessage("We currently don't have that drug");
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  useEffect(() => {
    if (query) {
      debouncedFetchSuggestions(query);
    } else {
      setErrorMessage("");
      console.log("show me", errorMessage);
      setSuggestions([]);
    }

    return () => debouncedFetchSuggestions.cancel();
  }, [query]);

  const handleDrugClick = (drugId) => {
    navigate(`/pharmacies?drugId=${drugId}`);
  };

  return (
    <div className="search">
      <div className="search-input">
        <div className="search__icon-div">
          <img src={searchIcon} alt="Search" className="search__icon" />
        </div>
        <label className="search__text">
          <h2 className="search__header-text">
            Hello! What medications are you looking for?
          </h2>
          <input
            type="text"
            className="search__header-input"
            placeholder="Enter a medication"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        {/* Display error message */}
        {!errorMessage && query && suggestions.length > 0 && (
          <div className="search__suggestions">
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
        {errorMessage && (
          <span className="search__error-message">{errorMessage}</span>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
