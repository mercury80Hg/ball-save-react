import { useState } from "react"



function Login ({ users }) {
  const [emailInput, setEmailInput] = useState('')
  const [initialInput, setInitialInput] = useState('')
  
  

  function handleEmailInput(event) {
    setEmailInput(event.target.value)
  }

  function handleInitialsInput(event) {
    setInitialInput(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    // const machineObj = machines.find(({ name }) => name === machineInput);
    // const loggedInUser = users.find(({ email }) => email === emailInput)
    // console.log("User Logged In: ", loggedInUser)
    // does a check that email is correct format and initials are 3 characters only
    // find user or create user in db
    // submit updates currentUser state on App.js
    
  }

  
  return (
    <div className='add-machine-container'>

      <form onSubmit={handleSubmit}>

        <div className='add-input-box'>
          <label className='label' htmlFor='location-input'>
            Email
          </label>

          <input
            name='email'
            id='email-input'
            type='text'
            value={emailInput}
            onChange={handleEmailInput}
            placeholder='Enter email'
            required
          />
        </div>

        <div className='add-input-box'>
          <label className='label' htmlFor='initials-input'>
            Pinball Initials
          </label>

          <input
            name='initials'
            id='initials-input'
            type='text'
            value={initialInput}
            onChange={handleInitialsInput}
            placeholder=' The "XYZ" you use for high scores'
            required
          />
        </div>

        <input className='add-submit' type='submit' value='Add' />
      </form>
    </div>
  )
}

export default Login