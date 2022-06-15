import axios from 'axios';

export function getApi() {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/countries`)
      return dispatch({
        type: "GET_API",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getCountries(sort, order, page, continent, name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/countries/filter?sort=${sort}&order=${order}&page=${page}&continent=${continent}&name=${name}`)
      return dispatch({
        type: "GET_COUNTRIES",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getCountryById(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({
        type: "GET_COUNTRY_ID",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getCountryByName(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/countries/search/${name}`);
      return dispatch({
        type: "GET_COUNTRY_NAME",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getActivities(name) {
  return async function (dispatch) {
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

export function activityCreate(payload) {
  return async function () {
    try {
      const json = await axios.post(`http://localhost:3001/activity`, payload)
      return json
    } catch (error) {
      console.log(error)
    }
  }
}

export function activityDelete(id) {
  return async function () {
    try {
      const json = await axios.delete(`http://localhost:3001/activity/${id}`)
      return json
    } catch (error) {
      console.log(error)
    }
  }
}

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_ID = "GET_COUNTRY_ID";
export const GET_COUNTRY_NAME = "GET_COUNTRY_NAME";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
