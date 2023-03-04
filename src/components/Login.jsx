import { useState } from 'react';
import { baseURL } from '../App';

function Login({ users, setCurrentUser, setUsers, getUsers }) {
  const [emailInput, setEmailInput] = useState('');
  const [initialInput, setInitialInput] = useState('');
  const [marquee, setMarquee] = useState('Go Ahead & Login!');

  function addUser(event) {
    fetch(baseURL + '/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err)); //eslint-disable-line no-console
  }

  function handleEmailInput(event) {
    setEmailInput(event.target.value);
  }

  function handleInitialsInput(event) {
    setInitialInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const loggedInUser = users.find(({ email }) => email === emailInput);

    function resetInputs() {
      setEmailInput('');
      setInitialInput('');
    }

    // TODO: Refactor this
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
      setMarquee('Logged In!');
      resetInputs();
    } else {
      addUser({ initials: initialInput, email: emailInput });
      setUsers(getUsers);
      setCurrentUser(users.find(({ email }) => email === emailInput));
      setMarquee('New User Created');
      resetInputs();
    }
    this.props.history.push('/history')
    
  }

  return (
    <div className='login-container'>
      <img
        className='pinBall'
        src='/images/black-pinball-trans.png'
        alt='big black pinball'
      />
      <form onSubmit={handleSubmit}>
        <div className='add-input-box'>
          <label className='label' htmlFor='location-input'>
            <div className='input-titles'>Email</div>
          </label>

          <input
            name='email'
            id='email-input'
            type='email'
            value={emailInput}
            onChange={handleEmailInput}
            placeholder='Enter email'
            required
          />
        </div>

        <div className='add-input-box'>
          <label className='label' htmlFor='initials-input'>
            <div className='input-titles'>Pinball Initials</div>
          </label>

          <input
            name='initials'
            id='initials-input'
            type='text'
            value={initialInput}
            onChange={handleInitialsInput}
            placeholder='RIP'
            pattern='\w{3}'
            required
          />
          <div style={{ fontSize: '1.75vh' }}>3 Characters for Initials</div>
        </div>

        <input className='add-submit' type='submit' value='Login' />
      </form>
      <div style={{padding: "20px"}} >
        {marquee}
      </div>
      
    </div>
  );
}

export default Login;
