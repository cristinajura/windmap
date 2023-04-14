import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearchChange }) => {
  const handleChange = (searchData) => {
    onSearchChange(searchData);
  };

  const loadOptions = async (inputCity) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?namePrefix=${inputCity}`,
        geoApiOptions
      );
      const response_1 = await response.json();
      return {
        options: response_1.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    } catch (err) {
      return console.error(err);
    }
  };

  return (
    <AsyncPaginate
      placeholder={
        <div>
          <div className="palceholderIcon">
            <FaSearch />
          </div>
          <div className="placeholderText">Search for a city...</div>
        </div>
      }
      debounceTimeout={600}
      value={" "}
      onChange={handleChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
