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
    e.preventDefault();
    dispatch(activityCreate(activity))
    alert("Activity created")
    setActivity({
      name: "",
      difficulty: 0,
      duration: 0,
      season: "",
      countries: []
    }) // history.push('/home');
  }

  return (
    <div>
      <Link to="/home">
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
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <br/>
          <label>Duration</label>
          <br/>
          <input name='duration' type="number" value={activity.duration} onChange={e => handleChange(e)}/>
          <br/>
          <label>Season</label>
          <br/>
          <select onChange={e => handleSeason(e)}>
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