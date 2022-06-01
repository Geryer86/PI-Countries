import './Home.css'
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getCountryById } from "../actions";
import { Link } from "react-router-dom";
import Cards from "./Cards";

export default function Home() {
  const dispatch = useDispatch()
  const allCountries = useSelector(state => state.allCountries) //mapStateToProps
  
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState("ASC")
  const [orderBy, setOrderBy] = useState("name")
  const [continent, setCont] = useState("")
  const [name, setName] = useState("")
  
  useEffect(() => {
    dispatch(getCountries(orderBy, order, page, continent, name))
  }, [dispatch, orderBy, order, page, continent, name])

  const prev = (e) => {
    e.preventDefault();
    if(page <= 0) {
      setPage(0);
    } else {
      setPage(page - 10)
    }
  }

  const next = (e) => {
    e.preventDefault();
    if(allCountries.length - 10) {
      return;
    } else {
      setPage(page + 10)
    }
  }

  const handleOrder = (e) => {
    e.preventDefault();
    setOrder(e.target.value)
  }

  const handleOrderBy = (e) => {
    e.preventDefault();
    setOrderBy(e.target.value)
  }

  const selectCont = (e) => {
    e.preventDefault();
    setCont(e.target.value);
  }

  const filterName = (e) => {
    e.preventDefault();
    setName(e.target.value)
  }
  
  return(
    <div>
      <Link to="/">LP</Link>
      <h1>HOME</h1>
      <div>
        <select onChange={(e) => handleOrder(e)}>
          <option value="ASC">Upward</option>
          <option value="DESC">Downward</option>
        </select>
        <select onChange={(e) => handleOrderBy(e)}>
          <option value="name">Alphabetic</option>
          <option value="population">Population</option>
        </select>
        <select onChange={(e) => selectCont(e)}>
          <option value="">Continent</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="North America">North/Central America</option>
          <option value="South America">South America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <input type="text" placeholder='Search Country' value={name} onChange={(e) => filterName(e)}/>
        <div>
          {
            allCountries && allCountries.map(e => {
              return(
                <Link to={`/home/${e.id}`}>
                  <Cards name={e.name} continent={e.continent} img={e.img} population={e.population} key={e.id}/>
                </Link>
              )
            })
          }
        </div>
    </div>
      <button onClick={(e) => {prev(e)}} disabled={page <= 0}>PREV</button>
      <button onClick={(e) => {next(e)}} disabled={page >= 240 || allCountries.length < 10}>NEXT</button>
    </div>
  )
}

// useEffect(() => {
  //   dispatch(getCountriesAlp(orderByAlp, page)) //mapDispatchToProps
  // },[dispatch, orderByAlp, page])

  // useEffect(() => {
  //   dispatch(getCountriesPop(orderByPop, page))
  // },[dispatch, orderByPop, page])

  // useEffect(() => {
  //   dispatch(getCountriesContA(continent, orderByAlp, page))
  // },[dispatch, continent, orderByAlp, page])

  // useEffect(() => {
  //   dispatch(getCountriesContP(continent, orderByPop, page))
  // },[dispatch, continent, orderByPop, page])

  
  // const orderAlph = (e) => {
  //   e.preventDefault();
  //   setAlp(e.target.value);
  // }

  // const orderPop = (e) => {
  //   e.preventDefault();
  //   setPop(e.target.value);
  // }

  // import { getCountriesAlp, getCountriesPop, getDetails, getCountriesContA, getCountriesContP, getCountries } from "../actions";

  // const countryById = (e) => {
  //   e.preventDefault();
  //   getCountryById(e.id)
  // }
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // }