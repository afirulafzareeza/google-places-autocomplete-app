import React, { useState } from "react";
import { AutoComplete, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaces } from "./actions/placesActions";

const { Option } = AutoComplete;

const App = () => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.places);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    dispatch(fetchPlaces(value));
  };

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const handleSearchButtonClick = () => {
    handleSearch(searchValue);
  };

  return (
    <div style={{ padding: "20px" }}>
      <AutoComplete
        style={{ width: "70%", marginRight: "10px" }}
        placeholder="Search for a place"
        onSearch={(value) => setSearchValue(value)}
        onSelect={(value) => handlePlaceClick(value)}
      >
        {places.map((place) => (
          <Option key={place} value={place}>
            {place}
          </Option>
        ))}
      </AutoComplete>
      <Button type="primary" onClick={handleSearchButtonClick}>
        Search
      </Button>
      {selectedPlace && (
        <div style={{ marginTop: "20px" }}>
          <h2>Selected Place:</h2>
          <div>{selectedPlace}</div>
        </div>
      )}
      {selectedPlace && (
        <div style={{ marginTop: "20px" }}>
          <h2>Map:</h2>
          <iframe
            title={`Map of ${selectedPlace}`}
            width="100%"
            height="400"
            frameBorder="0"
            style={{ border: 0 }}
            // src={`https://www.google.com/maps/embed/v1/place?q=${selectedPlace}&key=YOUR_GOOGLE_API_KEY`}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.77824586336!2d2.264635025003294!3d48.858938434537656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2smy!4v1695530460849!5m2!1sen!2smy"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default App;
