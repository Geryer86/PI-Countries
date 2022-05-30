import axios from 'axios';

export function getCountries(page, order, orderBy) {
  return async function(dispatch) {
    const json = await axios.get(`http://localhost:3001/countries?page=${page}&order=${order}&orderBy=${orderBy}`);
    return dispatch({
      type: "GET_COUNTRIES",
      payload: json.data
    })
  }
}

export function getDetails(id) {
  return async function(dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/countries/${id}`);
      console.log(json.data)
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data
      })
    } catch(error) {
      console.log(error)
    }
  }
}

export function getActivities(name) {
  return async function(dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/activity?name=${name}`);
      return dispatch({
        type: "GET_ACTIVITIES",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_ACTIVITIES = "GET_ACTIVITIES";