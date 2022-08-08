import './styles/Home.css'
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApi, getCountries, getCountriesNL } from "../actions";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import Pagination from './Pagination.jsx';


export default function Home() {
  const dispatch = useDispatch()
  const allCountries = useSelector(state => state.allCountries)
  const noLimitCt = useSelector((state) => state.countriesNL)

  const [page, setPage] = useState(0)
  const [order, setOrder] = useState()
  const [sort, setSort] = useState("")
  const [continent, setCont] = useState("")
  const [name, setName] = useState("")
  const [limit, setLimit] = useState(10)
  const [language, setLang] = useState("")

  const pagination = (pageNum) => {
    setPage((pageNum - 1) * limit);
  };

  useEffect(() => {
    dispatch(getCountries(sort, order, page, continent, name, limit, language))
    dispatch(getCountriesNL(sort, order, continent, name, language))
    dispatch(getApi())
  }, [dispatch, sort, order, page, continent, name, limit, language])

  const prev = (e) => {
    e.preventDefault();
    setPage(page - limit)
  }

  const next = (e) => {
    e.preventDefault();
    setPage(parseInt(page) + parseInt(limit))
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

  const handlePage = (e) => {
    e.preventDefault();
    setPage(e.target.value)
  }

  return(
    <div>
      <Link to="/"><img src='https://upload.wikimedia.org/wikipedia/commons/e/ef/Erioll_world_2.svg' width="50px"></img></Link>
      <h1 className='world'>...the World!</h1>
      <div>
        <select className='selects' onChange={(e) => handleOrder(e)}>
          <option disabled={order}>Order</option>
          <option value="ASC">Upward</option>
          <option value="DESC">Downward</option>
        </select>
        <select className='selects' onChange={(e) => handleSort(e)}>
          <option disabled={sort}>By</option>
          <option value="name">Alphabetic</option>
          <option value="population">Population</option>
          <option value="area">Area</option>
        </select>
        <select className='selects' onChange={(e) => selectCont(e)}>
          <option value="">All the world</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="North America">North/Central America</option>
          <option value="South America">South America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        {/* SearchBar */}
        <input className='selects' type="text" placeholder='Search country' value={name} onChange={(e) => filterName(e)}/>
        <div>
          <div>
          <Link to="/activities">
            <button>Go to activities</button>
          </Link>
          </div>
          {/* front pagination */}
          <div>
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
          {/* front map */}
        </div>
      </div>
      <div className='btns'>
      {/* <button onClick={(e) => {prev(e)}} disabled={page <= 0}>PREV</button> */}

      <Pagination limit={limit} page={page} pagination={pagination}/>
      
      {/* <button onClick={(e) => {next(e)}} disabled={page >= 240 || allCountries.length < 9}>NEXT</button> */}
      </div>
    </div>
  )
}
