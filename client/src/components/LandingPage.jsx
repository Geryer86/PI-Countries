import "./styles/LandingPage.css"
import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return(
    <div>
      <h1 className="hello">Hello World</h1>
      <Link to="/home">
        <button className="btn">Let's travel</button>
      </Link>
    </div>
  )
}

