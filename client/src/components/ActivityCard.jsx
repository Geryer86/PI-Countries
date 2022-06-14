import "./styles/ActivityCard.css";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "./Cards";
import { getApi } from "../actions";
import { Link } from "react-router-dom";


export default function ActivityCard({ name, difficulty, duration, season }) {

  const dispatch = useDispatch()
  const api = useSelector(state => state.api)
  const arr = api.filter(a => a.activities.find(c => (c.name === name) && (c.difficulty === difficulty) && (c.duration === duration) && (c.season === season)))

  useEffect(() => {
    dispatch(getApi())
  }, [dispatch])

  return (
    <div className="all">
      <div className="actdetails">
      <h3>{name}</h3>
      <h4>Difficulty {difficulty}/5</h4>
      <h4>Duration {duration} hours</h4>
      <h5>{season}</h5>
      </div>
        <div className="actcards">
          <div>
          Countries
          </div>
        {
          arr?.map(e => {
            return (
              <Link to={`/home/${e.id}`}>
                <Cards name={e.name} continent={e.continent} img={e.img} population={e.population} key={e.id}/>
              </Link>
            )
          })
        }
        </div>
    </div>
  );
}


