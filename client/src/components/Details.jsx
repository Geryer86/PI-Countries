import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryById } from "../actions";
import Card from "./Card";
import { useParams } from "react-router";
import { Link } from "react-router-dom";


export default function Details() {
  const dispatch = useDispatch()
  let { id } = useParams()
  const country = useSelector(state => state.country)

  useEffect(() => {
    dispatch(getCountryById(id))
  }, [dispatch, id])

  return (
    <div>
      Country details
      <Card
        name={country.name}
        area={country.area}
        continent={country.continent}
        capital={country.capital}
        population={country.population}
        img={country.img}
        activities={country.activities}
        key={country.id}
      />
      <Link to="/home">
        <button>Back</button>
      </Link>
    </div>
  )
}
