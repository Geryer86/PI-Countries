import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getDetail, getActivities } from "../actions";
import { Link } from "react-router-dom";
import ActivityCard from "./ActivityCard";

export default function Activities() {
  const dispatch = useDispatch()
  const allActivities = useSelector(state => state.activities) //mapStateToProps
  const [name, setName] = useState("AGG")

  useEffect(() => {
    dispatch(getActivities(name)) //mapDispatchToProps
  },[dispatch, name])

  return(
    <div>
      Activities
      <div>
        <select>
          <option>Name</option>
        </select>
      </div>
    {
      allActivities && allActivities.map(e => {
        return(
          <fragment>
            <Link>
              <ActivityCard name={e.name} season={e.season}/>
            </Link>
          </fragment>
        )
      })
    }
    </div>
  )
}
