const placesReducer = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_PLACES_SUCCESS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default placesReducer;
  