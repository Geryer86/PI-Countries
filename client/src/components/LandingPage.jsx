import "./styles/LandingPage.css"
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getApi } from "../actions";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getApi())
  }, [dispatch])
  
  return(
    <div>
      <h1 className="hello">Hello World</h1>
      <Link to="/home">
        <button className="btn">Let's travel</button>
      </Link>
    </div>
  )
}

