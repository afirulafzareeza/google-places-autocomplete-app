import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  places: [],
  selectedPlace: null
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PLACES':
      return { ...state, places: action.places };
    case 'SET_SELECTED_PLACE':
      return { ...state, selectedPlace: action.selectedPlace };
    default:
      return state;
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
