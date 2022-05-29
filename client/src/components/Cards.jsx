import React from "react";

export default function Card({ name, flag, continent }) {
  return(
    <div>
      <h3>{name}</h3>
      <h5>{continent}</h5>
      <img src={flag} alt="Image not found" width="80px" height="50px"/>
    </div>
  );
}