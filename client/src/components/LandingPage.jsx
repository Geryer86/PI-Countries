import "./LandingPage.css"
import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return(
    <div>
      <h1>LANDINGPAGE</h1>
      <Link to="/home">
        <button className="btn">Let's Travel</button>
      </Link>
    </div>
  )
}

