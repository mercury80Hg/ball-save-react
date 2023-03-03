import { useState } from "react"
import { baseURL } from "../App"



function Add () {
  const [machineInput, setMachineInput] = useState('')
  const [locationInput, setLocationInput] = useState('')
  const [scoreInput, setScoreInput] = useState('')
 
  const initialSubmitState = {
    user: '',
    machineName: '',
    location: '',
    date: '',
    score: '',
  }

  const [submitState, setSubmitState] = useState(initialSubmitState)


  const addScore = event =>
  fetch(baseURL + '/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  })
    .then(res => res.json())
    .catch(err => console.log(err)); //eslint-disable-line no-console

  
  function handleSubmit(event) {
    event.preventDefault()
    const { user, machineName, location, date, score } = submitState
    if (machineName && location && score) {
      try {
        addScore({
          
        })
        setSubmitState(initialSubmitState)
      } catch(error) {
        console.error(error)
      }
    }
  }

  function handleMachineInput(event) {
    setMachineInput(event.target.value)
  }

  function handleLocationInput(event) {
    setLocationInput(event.target.value)
  }

  function handleScoreInput(event) {
    setScoreInput(event.target.value)
  }

  return (
    <div className="add-machine-container" >
      <form onSubmit={handleSubmit}>

        <div className="add-input-box" >
          <label className="label" htmlFor="machine-input">
            Pinball Machine
          </label>
          
          <input 
            name='machine'
            id='machine-input'
            type='text'
            value={machineInput}
            onChange={handleMachineInput}
            placeholder='Type a pinball machine...'
            required />
        </div>
       
        <div className="add-input-box" >
          <label className="label" htmlFor="location-input"> 
            Machine Location
          </label>
         
          <input 
            name='location'
            id='location-input'
            type='text'
            value={locationInput}
            onChange={handleLocationInput}
            placeholder='Type a location...'
            required />
        </div>

        <div className="add-input-box" >
          <label className="label" htmlFor="score-input"> 
            Score
          </label>
         
          <input 
            name='score'
            id='score-input'
            type='text'
            value={scoreInput}
            onChange={handleScoreInput}
            placeholder='Put that rad score here...'
            required />
        </div>

        <input className="add-submit" type="submit" value='Add' />
      
      </form>
    </div>
  )
}

export default Add