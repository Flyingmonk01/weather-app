import React, { useState, useEffect, useRef } from "react";
import './SearchBar.css'; // Import the new CSS file

const SearchBar = ({ setCity }) => {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const fetchCities = async (searchTerm) => {
    if (!searchTerm) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=4&appid=${process.env.REACT_APP_API}`
      );
      const cities = await response.json();
      setFilteredCities(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 2) {
      fetchCities(e.target.value);
      setShowDropdown(true);
    }
  };

  const handleCitySelect = (city) => {
    setCity(city.name);
    setSearch(city.name);
    setShowDropdown(false);
  };

  // Handle clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  

  return (
    <div className="search-container" ref={dropdownRef}>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        onFocus={() => setShowDropdown(true)}
        className="search-input"
        placeholder="Enter city name..."
      />

      {showDropdown && (
        <div className="dropdown">
          {filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleCitySelect(city)}
              >
                {city.name}, {city.state}, {city.country}
              </div>
            ))
          ) : (
            <div className="no-cities">No cities found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
