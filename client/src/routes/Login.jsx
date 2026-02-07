import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pinballImage from '../images/black-pinball-trans.png';
import { addUser } from '../api/api';
import PinballPopup from '../components/PinballPopup';

function Login({ setCurrentUser }) {
  const [emailInput, setEmailInput] = useState('');
  const [initialInput, setInitialInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPinball, setShowPinball] = useState(false);
  const [miniGameHighScore, setMiniGameHighScore] = useState(0);
  const navigate = useNavigate();

  function handleEmailInput(event) {
    setEmailInput(event.target.value);
  }

  function handleInitialsInput(event) {
    const upperValue = event.target.value.toUpperCase();
    setInitialInput(upperValue);
  }

  function handleMiniGameHighScore(highScore) {
    setMiniGameHighScore(highScore);
  }

  function handlePinballOpen() {
    setShowPinball(true);
  }

  function handlePinballClose() {
    setShowPinball(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setShowModal(true); // Show modal with pinball option after login attempt

    function resetInputs() {
      setEmailInput('');
      setInitialInput('');
    }

    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 30000);
      });

      const newUser = await Promise.race([
        addUser({
          initials: initialInput,
          email: emailInput,
          miniGameHighScore: miniGameHighScore,
        }),
        timeoutPromise,
      ]);

      if (newUser) {
        setCurrentUser(newUser);
        resetInputs();
        setIsLoading(false);
        setShowModal(false); // Close modal when server is ready
        navigate('/history');
      } else {
        setIsLoading(false);
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Login error:', error);
      if (error.message === 'Request timeout') {
        alert(
          'Login is taking too long. The server may be starting up. Please try again in a moment.',
        );
      } else {
        alert('Login failed. Please check your connection and try again.');
      }
    }
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
            style={{
              width: '15vw',
              textTransform: 'uppercase',
            }} // classname vs inline style
            name='initials'
            id='initials-input'
            type='text'
            value={initialInput}
            onChange={handleInitialsInput}
            placeholder='BBC'
            pattern='[A-Z]{3}'
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
      <div style={{ padding: '20px' }} className={isLoading ? 'loading' : ''}>
        {isLoading ? 'Loading' : 'Go Ahead, Login!'}
      </div>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'rgb(31, 28, 28)',
              padding: '4vh',
              borderRadius: '25px',
              maxWidth: '80vw',
              width: '60vh',
              textAlign: 'center',
              borderStyle: 'outset',
              borderTop: 'solid 2px rgb(33, 33, 33)',
              borderLeft: 'solid 2px rgb(33, 33, 33)',
              borderBottom: 'solid 2px rgb(118, 118, 118)',
              borderRight: 'solid 2px rgb(118, 118, 118)',
              boxShadow: '0px 20px 40px 0px black',
            }}
          >
            <h2
              style={{
                marginBottom: '3vh',
                color: 'orange',
                fontFamily: 'dotrice',
                fontSize: '3.5vh',
                fontWeight: 'normal',
              }}
            >
              ⏳ Server Notice
            </h2>
            <p
              style={{
                marginBottom: '3vh',
                lineHeight: '1.5',
                color: 'orange',
                fontFamily: 'dotrice',
                fontSize: '2.5vh',
              }}
            >
              This app uses a free server and cold starts can take a couple
              minutes. Your patience is appreciated.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                marginBottom: '2vh',
              }}
            >
              <button
                onClick={handlePinballOpen}
                style={{
                  backgroundColor: 'rgb(163, 29, 29)',
                  color: 'orange',
                  border: 'none',
                  padding: '1.5vh 3vh',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontSize: '3vh',
                  fontFamily: 'dotrice',
                  borderStyle: 'outset',
                  borderTop: 'solid 2px rgb(33, 33, 33)',
                  borderLeft: 'solid 2px rgb(33, 33, 33)',
                  borderBottom: 'solid 2px rgb(118, 118, 118)',
                  borderRight: 'solid 2px rgb(118, 118, 118)',
                  boxShadow: '0px 10px 20px 0px rgb(48, 48, 48)',
                }}
              >
                🎮 Play Pinball
              </button>

              <button
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: 'black',
                  color: 'orange',
                  border: 'none',
                  padding: '1.5vh 3vh',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontSize: '3vh',
                  fontFamily: 'dotrice',
                  borderStyle: 'outset',
                  borderTop: 'solid 2px rgb(33, 33, 33)',
                  borderLeft: 'solid 2px rgb(33, 33, 33)',
                  borderBottom: 'solid 2px rgb(118, 118, 118)',
                  borderRight: 'solid 2px rgb(118, 118, 118)',
                  boxShadow: '0px 10px 20px 0px rgb(48, 48, 48)',
                }}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      <PinballPopup
        isOpen={showPinball}
        onClose={handlePinballClose}
        onHighScoreUpdate={handleMiniGameHighScore}
      />
    </div>
  );
}

export default Login;
