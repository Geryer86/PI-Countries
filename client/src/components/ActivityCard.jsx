import React from "react";

export default function ActivityCard({ name, season }) {
  return(
    <div>
      <h3>{name}</h3>
      <h5>{season}</h5>
    </div>
  );
}