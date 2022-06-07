import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApi, activityCreate } from '../actions';
import { useDispatch, useSelector } from 'react-redux';


export default function ActivityCreate() {
  const dispatch = useDispatch()
  const countries = useSelector((state) => state.api);
  
  const [activity, setActivity] = useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
    countries: []
  })
  
  useEffect(() => {
    dispatch(getApi());
  }, [dispatch]);

  const handleChange = (e) => {
    setActivity({
      ...activity,
      [e.target.name]: e.target.value
    })
  }

  const handleDifficulty = (e) => {
    setActivity({
      ...activity,
      difficulty: e.target.value
    })
  }

  const handleSeason = (e) => {
    setActivity({
      ...activity,
      season: e.target.value
    })
  }

  const handleSelect = (e) => {
    setActivity({
      ...activity,
      countries: [...activity.countries, e.target.value]
    })
  }

  const handleDeleteCountry = (e) => {
    setActivity({
      ...activity,
      countries: activity.countries.filter(g => g !== e)
    })
  }

  const handleSubmit = (e) => {
    if(!activity.countries.length) {
      alert("You must choose a country")
    }
    else if(typeof activity.name === "integer") {
      alert("Cannot use numbers")
    }
    else if(!activity.name) {
      alert("You must write a name for the activity")
    }
    else if(!activity.difficulty) {
      alert("You must set the difficulty for the activity")
    }
    else if(!activity.season) {
      alert("You must select the season")
    }
    else {
    dispatch(activityCreate(activity))
    alert("Activity created")
    console.log(activity)
    setActivity({
      name: "",
      difficulty: 0,
      duration: 0,
      season: "",
      countries: []
    })
   } // history.push('/home');
  }

  return (
    <div>
      <Link to="/activities">
        <button>Back</button>
      </Link>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Activity</label>
          <br/>
          <input name='name' type="text" placeholder='Activity name' value={activity.name} onChange={(e) => handleChange(e)}/>
          <br/>
          <label>Difficulty</label>
          <br/>
          <select onChange={e => handleDifficulty(e)}>
            <option>Select difficulty</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <br/>
          <label>Duration</label>
          <br/>
          <input name='duration' type="number" min={1} max={24} value={activity.duration} onChange={(e) => handleChange(e)}/>
          <br/>
          <label>Season</label>
          <br/>
          <select onChange={e => handleSeason(e)}>
            <option>Select season</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
          </select>
          <br/>
          <br/>
          <label>Countries</label>
          <br/>
          <select onChange={(e) => handleSelect(e)}>
            <option disabled={activity.countries.length}>Select countries</option>
            {
              countries?.map((e) => <option value={e.name}>{e.name}</option>)
            }
          </select>
          <h6>Countries</h6>
          {
            activity.countries.map((e) => <div>
              <button type='reset' onClick={() => handleDeleteCountry(e)}>x</button>
              <p>{e}</p>
            </div>)
          }
          <br/>
          <button type='submit'>Create</button>
        </form>
      </div>
    </div>
  )
}

//const act = useSelector((state) => state.activities)
//const arr = act.filter(c => (c.name === name) && (c.difficulty === difficulty) && (c.duration === duration) && (c.season === season) && (c.countries.find(e => e.name === countries.name)))
//const arr = countries.filter(a => a.activities.find(c => (c.name === name) && (c.difficulty === difficulty) && (c.duration === duration) && (c.season === season)))
//const arrId = countries.filter(a => a.activities.find(c => c.id))

//const platforms = useSelector((state) => state.platforms);
//const history = useHistory()

// const handlePlatform = (e) => {
//   setInput({
//     ...input,
//     platforms: [...input.platforms, e.target.value]
//   })
// }

  // const handleDeletePlatforms = (e) => {
  //   setInput({
  //     ...input,
  //     genre: input.genre.filter(pla => pla !== e)
  //   })