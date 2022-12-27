import React from "react";
import "../App.css";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";
import { options } from "../locations";

const SearchLocation = ({ onSearchChange }) => {
  const [searchLocation, setSearchLocation] = React.useState(null);

  const handleChange = (selectSpot) => {
    setSearchLocation(selectSpot);
    onSearchChange(selectSpot);
  };

  return (
    <Select
      placeholder={
        <div>
          <div className="palceholderIcon">
            <FaSearch />
          </div>
          <div className="placeholderText">Location search...</div>
        </div>
      }
      options={options}
      onChange={handleChange}
      value={"Location search..."}
    />
  );
};

export default SearchLocation;
