import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";
import Card from "./Card";
import { useParams } from "react-router";


export default function Details() {
  const dispatch = useDispatch()
  let { id } = useParams()
  const details = useSelector(state => state.details)
  //const [id, setId] = useState(id)
  
  useEffect(() => {
    dispatch(getDetails(id))
  },[dispatch], id)

  return(
    <div>
      <Card
        name={details.name}
        continent={details.continent}
        capital={details.capital}
        population={details.population}
        img={details.img}
        activities={details.activities}
        key={details.id}
      />
    </div>
  )
}
