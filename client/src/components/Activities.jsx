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
      <div>
        <Link to="/activities/createActivity">
          <button>Create Activity</button>
        </Link>
      </div>
      <div>
        <input type="text" placeholder='Search activity' value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
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
      <div>
        <Link to="/home">
          <button>Back to home</button>
        </Link>
      </div>
    </div>
  )
}
