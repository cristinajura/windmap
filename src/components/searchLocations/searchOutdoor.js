import React from "react";
import "../../App.css";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";
import { outdoorLocations } from "../../locations/outdoor";

const SearchOutdoor = ({ onSearchChange }) => {
  const handleChange = (selectSpot) => {
    onSearchChange(selectSpot);
  };

  return (
    <Select
      placeholder={
        <div>
          <div className="palceholderIcon">
            <FaSearch />
          </div>
          <div className="placeholderText">Search outdoor location...</div>
        </div>
      }
      options={outdoorLocations}
      onChange={handleChange}
      value={" "}
    />
  );
};

export default SearchOutdoor;
