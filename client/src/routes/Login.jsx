import { useState } from 'react';
import { baseURL } from '../App';
import { useNavigate } from 'react-router-dom';
import pinballImage from '../images/black-pinball-trans.png';
import { apiURL } from '../api/api';

function Login({ setCurrentUser }) {
  const [emailInput, setEmailInput] = useState('');
  const [initialInput, setInitialInput] = useState('');
  const [marquee, setMarquee] = useState((<div style={{ padding: '20px' }}>Go Ahead Login!</div>));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function addUser(event) {
    try {
      const user = await fetch(apiURL + '/user', {
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
    // if (isLoading === true) {
      setMarquee((<div className="loading" >Loading</div>))
    // } 

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
      // setIsLoading(false);
      navigate('/history');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='login-container'>
      <div className='login-main-title'></div>

      <img className='pinBall' src={pinballImage} alt='big black pinball' />
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
            style={{ width: '15vw' }}
            name='initials'
            id='initials-input'
            type='text'
            value={initialInput}
            onChange={handleInitialsInput}
            placeholder='BBC'
            pattern='\w{3}'
            maxLength={3}
            required
          />
          <div style={{ fontSize: '1.75vh' }}>3 Characters for Initials</div>
        </div>

        <input className='add-submit' type='submit' value='Login' />
      </form>
      {marquee}
    </div>
  );
}

export default Login;
