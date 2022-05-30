import React from "react";
//import "./Cards.css"

export default function Card({ name, continent, population, img }) {
  const displayName = name.slice(0,25)
  return(
    <div className="cards">
      <h4>{displayName}</h4>
      <h6>{continent}</h6>
      <h6>Population {population}</h6>
      <img src={img} alt="No flag to display" width="180px" height="100px"/>
    </div>
  );
}