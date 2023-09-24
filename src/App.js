import React, { useEffect, useState } from 'react';
import { AutoComplete, Button } from 'antd';

const { Option } = AutoComplete;

const App = () => {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const mapObject = new window.google.maps.Map(document.getElementById('googleMap'), {
      center: { lat: 40.712776, lng: -74.005974 },
      zoom: 15,
    });
    setMap(mapObject);

    const autocompleteObject = new window.google.maps.places.Autocomplete(
      document.getElementById('autocomplete')
    );
    setAutocomplete(autocompleteObject);

    autocompleteObject.addListener('place_changed', () => {
      const place = autocompleteObject.getPlace();
      if (place.geometry) {
        setSelectedPlace(place.name);
        mapObject.setCenter(place.geometry.location);
        mapObject.setZoom(17);

        const infoWindow = new window.google.maps.InfoWindow({
          position: place.geometry.location,
          content: `<div><strong>${place.name}</strong><br/>Lat: ${place.geometry.location.lat()}<br/>Lng: ${place.geometry.location.lng()}</div>`,

        });

        infoWindow.open(mapObject);

        console.log('Latitude:', place.geometry.location.lat());
        console.log('Longitude:', place.geometry.location.lng());
      }
    });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <input
        id="autocomplete"
        type="text"
        style={{ width: '70%', marginRight: '10px' }}
        placeholder="Search for a place"
      />
      <Button type="primary">Search</Button>
      {selectedPlace && (
        <div style={{ marginTop: '20px' }}>
          <h2>Selected Place:</h2>
          <div>{selectedPlace}</div>
        </div>
      )}
      <div id="googleMap" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>
    </div>
  );
};

export default App;
