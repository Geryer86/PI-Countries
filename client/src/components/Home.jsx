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
  const [order, setOrder] = useState()
  const [sort, setSort] = useState("")
  const [continent, setCont] = useState("")
  const [name, setName] = useState("")
  
  useEffect(() => {
    dispatch(getCountries(sort, order, page, continent, name))
  }, [dispatch, sort, order, page, continent, name])

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
    if(allCountries.length < 9) {
      return;
    } else {
      setPage(page + 10)
    }
  }

  const handleOrder = (e) => {
    e.preventDefault();
    setOrder(e.target.value)
  }

  const handleSort = (e) => {
    e.preventDefault();
    setSort(e.target.value)
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
      <Link to="/"><img src='https://upload.wikimedia.org/wikipedia/commons/e/ef/Erioll_world_2.svg' width="50px"></img></Link>
      <h1>...the World!</h1>
      <div>
        <select onChange={(e) => handleOrder(e)}>
          <option disabled={order}>Order</option>
          <option value="ASC">Upward</option>
          <option value="DESC">Downward</option>
        </select>
        <select onChange={(e) => handleSort(e)}>
          <option disabled={sort}>By</option>
          <option value="name">Alphabetic</option>
          <option value="population">Population</option>
        </select>
        <select onChange={(e) => selectCont(e)}>
          <option value="">All the world</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="North America">North/Central America</option>
          <option value="South America">South America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <input type="text" placeholder='Search country' value={name} onChange={(e) => filterName(e)}/>
        <div>
        <div>
        <Link to="/activities">
          <button>Go to activities</button>
        </Link>
        </div>
          {
            allCountries?.map(e => {
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
      <button onClick={(e) => {next(e)}} disabled={page >= 240 || allCountries.length < 9}>NEXT</button>
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