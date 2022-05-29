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

export function getDetail(id) {
  return async function(dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data
      })
    } catch(error) {

    }
  }
}

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_DETAILS = "GET_DETAILS";