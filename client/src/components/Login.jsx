import { useState } from 'react';
import { baseURL } from '../App';
import { useNavigate } from 'react-router-dom';
import Title from './Title';

function Login({ setCurrentUser }) {
  const [emailInput, setEmailInput] = useState('');
  const [initialInput, setInitialInput] = useState('');
  const [marquee, setMarquee] = useState('Go Ahead & Login!');
  const navigate = useNavigate();

  async function addUser(event) {
    try {
      const user = await fetch(baseURL + '/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      const result = await user.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  function handleEmailInput(event) {
    setEmailInput(event.target.value);
  }

  function handleInitialsInput(event) {
    setInitialInput(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    function resetInputs() {
      setEmailInput('');
      setInitialInput('');
    }

    try {
      const newUser = await addUser({
        initials: initialInput,
        email: emailInput,
      });

      console.log(newUser);
      setCurrentUser(newUser);
      resetInputs();

      navigate('/history');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='login-container'>
      <div className='login-main-title'>
      </div>

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
            placeholder='... Enter email ...'
            required
          />
        </div>

        <div className='add-input-box'>
          <label className='label' htmlFor='initials-input'>
            <div className='input-titles'>Pinball Initials</div>
          </label>

          <input
            style={{width: "15vw"}}
            name='initials'
            id='initials-input'
            type='text'
            value={initialInput}
            onChange={handleInitialsInput}
            placeholder='..RIP..'
            pattern='\w{3}'
            maxLength={3}
            required
          />
          <div style={{ fontSize: '1.75vh' }}>3 Characters for Initials</div>
        </div>

        <input className='add-submit' type='submit' value='Login' />
      </form>
      <div style={{ padding: '20px' }}>{marquee}</div>
    </div>
  );
}

export default Login;
