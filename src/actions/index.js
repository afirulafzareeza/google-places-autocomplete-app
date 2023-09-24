export const setPlaces = (places) => ({
  type: 'SET_PLACES',
  places
});

export const setSelectedPlace = (selectedPlace) => ({
  type: 'SET_SELECTED_PLACE',
  selectedPlace
});

export const fetchPlaces = (query) => async (dispatch) => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=APIKEY`);
    const data = await response.json();
    dispatch(setPlaces(data.predictions.map(p => p.description)));
  } catch (error) {
    console.error('Failed to fetch places:', error);
  }
};
