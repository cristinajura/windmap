import React from "react";
import "../App.css";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";
import { paraglidingSpots } from "../paragliding";

const SearchParagliding = ({ onSearchChange }) => {
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
          <div className="placeholderText">Search paragliding spot...</div>
        </div>
      }
      options={paraglidingSpots}
      onChange={handleChange}
      value={" "}
    />
  );
};

export default SearchParagliding;
