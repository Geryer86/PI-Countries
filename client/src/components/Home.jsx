import './styles/Home.css'
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApi, getCountries } from "../actions";
import { Link } from "react-router-dom";
import Cards from "./Cards";


export default function Home() {
  const dispatch = useDispatch()
  const allCountries = useSelector(state => state.allCountries)
  
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState()
  const [sort, setSort] = useState("")
  const [continent, setCont] = useState("")
  const [name, setName] = useState("")
  
  useEffect(() => {
    dispatch(getCountries(sort, order, page, continent, name))
    dispatch(getApi())
  }, [dispatch, sort, order, page, continent, name])
  
  const prev = (e) => {
    e.preventDefault();
    setPage(page - 10)
  }

  const next = (e) => {
    e.preventDefault();
      setPage(page + 10)
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
        {/* SearchBar */}
        <input type="text" placeholder='Search country' value={name} onChange={(e) => filterName(e)}/>
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
      <button onClick={(e) => {prev(e)}} disabled={page <= 0}>PREV</button>

      <button onClick={(e) => {handlePage(e)}} value={0} hidden={page >= 40 || allCountries.length < 9}>1</button>
      <button onClick={(e) => {handlePage(e)}} value={10} hidden={page >= 50 || allCountries.length < 9}>2</button>
      <button onClick={(e) => {handlePage(e)}} value={20} hidden={page >= 60 || allCountries.length < 9}>3</button>
      <button onClick={(e) => {handlePage(e)}} value={30} hidden={page >= 70 || allCountries.length < 9}>4</button>
      <button onClick={(e) => {handlePage(e)}} value={40} hidden={page >= 80 || allCountries.length < 9}>5</button>
      <button onClick={(e) => {handlePage(e)}} value={50} hidden={page < 40 || page >=90 || allCountries.length < 9}>6</button>
      <button onClick={(e) => {handlePage(e)}} value={60} hidden={page < 50 || page >=100 || allCountries.length < 9}>7</button>
      <button onClick={(e) => {handlePage(e)}} value={70} hidden={page < 60 || page >=110 || allCountries.length < 9}>8</button>
      <button onClick={(e) => {handlePage(e)}} value={80} hidden={page < 70 || page >=120 || allCountries.length < 9}>9</button>
      <button onClick={(e) => {handlePage(e)}} value={90} hidden={page < 80 || page >=130 || allCountries.length < 9}>10</button>
      <button onClick={(e) => {handlePage(e)}} value={100} hidden={page < 90 || page >=140 || allCountries.length < 9}>11</button>
      <button onClick={(e) => {handlePage(e)}} value={110} hidden={page < 100 || page >=150 || allCountries.length < 9}>12</button>
      <button onClick={(e) => {handlePage(e)}} value={120} hidden={page < 110 || page >=160 || allCountries.length < 9}>13</button>
      <button onClick={(e) => {handlePage(e)}} value={130} hidden={page < 120 || page >=170 || allCountries.length < 9}>14</button>
      <button onClick={(e) => {handlePage(e)}} value={140} hidden={page < 130 || page >=180 || allCountries.length < 9}>15</button>
      <button onClick={(e) => {handlePage(e)}} value={150} hidden={page < 140 || page >=190 || allCountries.length < 9}>16</button>
      <button onClick={(e) => {handlePage(e)}} value={160} hidden={page < 150 || page >=200 || allCountries.length < 9}>17</button>
      <button onClick={(e) => {handlePage(e)}} value={170} hidden={page < 160 || page >=210 || allCountries.length < 9}>18</button>
      <button onClick={(e) => {handlePage(e)}} value={180} hidden={page < 170 || page >=220 || allCountries.length < 9}>19</button>
      <button onClick={(e) => {handlePage(e)}} value={190} hidden={page < 180 || page >=230 || allCountries.length < 9}>20</button>
      <button onClick={(e) => {handlePage(e)}} value={200} hidden={page < 190 || allCountries.length < 9}>21</button>
      <button onClick={(e) => {handlePage(e)}} value={210} hidden={page < 200 || allCountries.length < 9}>22</button>
      <button onClick={(e) => {handlePage(e)}} value={220} hidden={page < 210 || allCountries.length < 9}>23</button>
      <button onClick={(e) => {handlePage(e)}} value={230} hidden={page < 220 || allCountries.length < 9}>24</button>
      <button onClick={(e) => {handlePage(e)}} value={240} hidden={page < 230 || allCountries.length < 9}>25</button>

      <button onClick={(e) => {next(e)}} disabled={page >= 240 || allCountries.length < 9}>NEXT</button>
      </div>
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

  // const handlePage = (e) => {
  //   e.preventDefault();
  //   setPage(e.target.value)
  // }

  // import Pagination from './Pagination';

  // const [currentPage, setCurrentPage] = useState(1)
  // const [countriesPage, setCountriesPage] = useState(10)
  // const indexOfLastCountry = currentPage * countriesPage
  // const indexOfFirstCountry = indexOfLastCountry - countriesPage
  // const currentCountries = api.slice(indexOfFirstCountry, indexOfLastCountry)

  // const pagination = (pageNums) => {
  //   setCurrentPage(pageNums)
  // }

  // <div>
  // <Pagination countriesPage={countriesPage} api={api.length} pagination={pagination}/>
  // </div>

  // <div className='sdo'>
  //         {
  //           currentCountries?.map(e => {
  //             return(
  //               <Cards name={e.name} continent={e.continent} img={e.img} population={e.population} key={e.id}/>
  //             )
  //           })
  //         }
  // </div>

  // import SearchBar from './SearchBar';