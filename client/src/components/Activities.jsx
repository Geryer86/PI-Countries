import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../actions";
import { Link } from "react-router-dom";
import ActivityCard from "./ActivityCard";

export default function Activities() {
  const dispatch = useDispatch()
  const allActivities = useSelector(state => state.activities)
  const [name, setName] = useState()

  useEffect(() => {
    dispatch(getActivities(name))
  }, [dispatch, name])

  return (
    <div>
      <input type="text" placeholder='Search activity' value={name} onChange={(e) => setName(e.target.value)} />
      {
        allActivities?.map(e => {
          return (
            <ActivityCard
              name={e.name}
              difficulty={e.difficulty}
              duration={e.duration}
              season={e.season}
              countries={e.countries}
            />
          )
        })
      }
      <Link to="/home">
        <button>Back</button>
      </Link>
    </div>
  )
}
