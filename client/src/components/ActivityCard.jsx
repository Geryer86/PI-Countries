import "./styles/ActivityCard.css";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "./Cards";
import { getApi } from "../actions";
import { Link } from "react-router-dom";


export default function ActivityCard({ name, difficulty, duration, season, id }) {

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

// var arr = [
//   {
//     na: 1,
//     ac:[
//       {a:1,b:1},{a:2,b:2},{a:3,b:3}
//     ]
//   },
//   {
//     na: 2,
//     ac:[
//       {a:4,b:4},{a:5,b:5},{a:6,b:6}
//     ]
//   },
//   {
//     na:3,
//     ac:[
//       {a:7,b:7},{a:3,b:8},{a:9,b:9}
//     ]
//   }
// ]
// var arr1 = arr.filter(e => e.ac.find(c=>c.a===3))
// {
//   countries?.map(e => {
//     console.log(countries)
//     return (
//       <div>
//         <h5>{e.name}</h5>
//       </div>
//     )
//   })
// }

