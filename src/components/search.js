import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../api";
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputCity) => {
    return fetch(`${GEO_API_URL}/cities?namePrefix=${inputCity}`, geoApiOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  return (
    <AsyncPaginate
      placeholder={
        <div>
          <div className="palceholderIcon">
            <FaSearch />
          </div>
          <div className="placeholderText">Search for city...</div>
        </div>
      }
      debounceTimeout={600}
      value={"Search for city..."}
      onChange={handleChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
