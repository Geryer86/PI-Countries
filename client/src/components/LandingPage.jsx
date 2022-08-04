import "./styles/LandingPage.css"
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApi, getCountries } from "../actions";
import { Link } from "react-router-dom";

export default function LandingPage() {
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
  
  return(
    <div>
      <h1 className="hello">Hello World</h1>
      <Link to="/home">
        <button className="btn">Let's travel</button>
      </Link>
    </div>
  )
}

