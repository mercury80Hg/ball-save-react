import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pinballImage from '../images/black-pinball-trans.png';
import { addUser } from '../api/api';
import useFetch from '../hooks/useFetch';

function Landing({ setCurrentUser }) {
  const [emailInput, setEmailInput] = useState('');
  const [initialInput, setInitialInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleGoogle, loading, error } = useFetch("h")

  function handleEmailInput(event) {
    setEmailInput(event.target.value);
  }

  function handleInitialsInput(event) {
    setInitialInput(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    function resetInputs() {
      setEmailInput('');
      setInitialInput('');
    }

    const newUser = await addUser({
      initials: initialInput,
      email: emailInput,
    });

    if (newUser) {
      setCurrentUser(newUser);
      resetInputs();
      setIsLoading(false);
      navigate('/history');
    } else {
      setIsLoading(false);
    }
  }

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  return (
    <div className='login-container'>
      <img className='pinBall' src={pinballImage} alt='big black pinball' />
      <form onSubmit={handleSubmit}>
        <div className='add-input-box'>
          <label className='label' htmlFor='email-input'>
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
            style={{ width: '15vw' }} // classname vs inline style
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

        <input
          className='add-submit'
          type='submit'
          value='Login'
          disabled={isLoading}
        />
      </form>
      <div className="g-signin2" data-onsuccess="onSignIn"></div>
      <div style={{ padding: '20px' }} className={isLoading ? 'loading' : ''}>
        {isLoading ? 'Loading' : 'Go Ahead, Login!'}
      </div>
    </div>
  );
}

export default Landing;