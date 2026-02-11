import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pinballImage from '../images/black-pinball-trans.png';
import { addUser } from '../api/api';
import PinballGame from '../components/PinballGame';

function Login({ setCurrentUser }) {
  const [emailInput, setEmailInput] = useState('');
  const [initialInput, setInitialInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [serverStatus, setServerStatus] = useState('warming'); // 'warming' or 'ready'
  const [pinballHighScore, setPinballHighScore] = useState(0);
  const navigate = useNavigate();

  // Navigate to app after successful login when modal is manually closed
  useEffect(() => {
    if (loginSuccess && !showModal) {
      navigate('/history');
    }
  }, [loginSuccess, showModal, navigate]);

  const handlePinballHighScore = (score) => {
    setPinballHighScore(score);
  };

  function handleEmailInput(event) {
    setEmailInput(event.target.value);
  }

  function handleInitialsInput(event) {
    const upperValue = event.target.value.toUpperCase();
    setInitialInput(upperValue);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log('Login button clicked, showing modal');
    setIsLoading(true);
    setShowModal(true); // Show modal after login button is pressed

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
          miniGameHighScore: pinballHighScore, // Include pinball high score
        }),
        timeoutPromise,
      ]);

      if (newUser) {
        console.log('Login successful, keeping modal open');
        setCurrentUser(newUser);
        resetInputs();
        setIsLoading(false);
        setLoginSuccess(true); // Mark login as successful
        setServerStatus('ready'); // Server is now ready
        // Keep modal open - user must close it manually
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
        <div className='modal-overlay'>
          <div className='modal-container'>
            <h2 className='server-modal-title'>
              {serverStatus === 'warming'
                ? '⏳ Server Warming Up'
                : '✅ Server Ready'}
            </h2>
            <p className='server-modal-message'>
              {serverStatus === 'warming'
                ? 'Server is starting up. Play pinball while you wait!'
                : 'Server is ready! You can continue playing or close to proceed to the app.'}
            </p>

            <div className='pinball-game-container'>
              <PinballGame
                onHighScoreUpdate={handlePinballHighScore}
                onServerReady={() => setServerStatus('ready')}
              />
            </div>

            <button
              className='server-modal-close-button'
              onClick={() => {
                console.log('Close button clicked, hiding modal');
                setShowModal(false);
              }}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
