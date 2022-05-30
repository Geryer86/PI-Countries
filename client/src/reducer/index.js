const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  details: []
}

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        allCountries: action.payload
      }
      case "GET_DETAILS":
        return {
          ...state,
          details: action.payload
        }
      default: return state;
  }
}

export default rootReducer;