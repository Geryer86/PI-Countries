import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";
import Card from "./Card";

export default function Details() {
  const dispatch = useDispatch()
  const details = useSelector(state => state.details)
  const [id, setId] = useState(id)

  useEffect(() => {
    dispatch(getDetails(id))
  },[dispatch, id])

  return(
    <div>
      {
        details && details.map(e => {
          return(
            <fragment>
              <Card name={e.name} continent={e.continent} population={e.population} img={e.img}/>
            </fragment>
          )
        })
      }
    </div>
  )
}
