const initialState = {
  allCountries: [],
  activities: [],
  country: [],
  api: [],
  countriesNL: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        allCountries: action.payload,
      }
    case "GET_COUNTRY_ID":
      return {
        ...state,
        country: action.payload,
      }
    case "GET_COUNTRIES_NL":
      return {
        ...state,
        countriesNL: action.payload,
      }
    case "GET_COUNTRY_NAME":
      return {
        ...state,
        allCountries: action.payload
      }
    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload
      }
    case "GET_API":
      return {
        ...state,
        api: action.payload
      }
    default: return state;
  }
}

export default rootReducer;