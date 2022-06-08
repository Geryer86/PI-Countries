import React from "react";
import "./styles/Card.css"


export default function Card({ name, capital, area, continent, population, img, id, activities }) {
  return (
    <div key={id}>
      <div className="detail">
        <h3>{name}</h3>
        <h4>Capital: {capital}</h4>
        <h5>Area: {area} Km2</h5>
        <h5>{continent}</h5>
        <h6>Population: {population}</h6>
        <img src={img} alt="No flag to display" width="180px" height="100px" />
      </div>
      <div className="activities">
        <h3>Activities</h3>
        {
          activities?.map(e => {
            return (
              <div className="actdet">
                <h5 className="actName">{e.name}</h5>
                <h5>Difficulty {e.difficulty}/5</h5>
                <h5>Duration {e.duration} hours</h5>
                <h5>{e.season}</h5>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}