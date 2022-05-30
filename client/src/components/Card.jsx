import React from "react";
//import "./Cards.css"

export default function Card({ name, capital, continent, population, img, id, activities }) {

  return (
    <div className="cards" key={id}>
      <h4>{name}</h4>
      <h4>{capital}</h4>
      <h6>{continent}</h6>
      <h6>Population {population}</h6>
      <img src={img} alt="No flag to display" width="180px" height="100px" />
      <div><h3>Activities: </h3>
        {activities?.map(e => {
          return (
            <div>
            <h5>Name {e.name}</h5>
            <h5>Duration {e.duration}</h5>
            </div>
          )
        })}
      </div>
    </div>
  );
}