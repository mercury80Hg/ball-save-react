import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from '../App';
import { fetchScores } from '../api/api';
import AddButton from '../components/AddButton';
import NavDisplay from '../components/NavDisplay';
// import Photo from './Photo';

// import AutoComplete from './AutoComplete';

function Add({ user, machines, scoreHistory, setScoreHistory }) {
  const [machineInput, setMachineInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [scoreInput, setScoreInput] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      navigate('/login');
    }
  }, [user.email]);

  async function addScore(event) {
    try {
      const score = await fetch(baseURL + '/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      const result = await score.json();
      // setScoreHistory((prevScores) => {
      //   const newScores = [...prevScores, event]
      //   return newScores
      // })
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  function resetInputs() {
    setLocationInput('');
    setMachineInput('');
    setScoreInput('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const machineObj = machines.find(({ name }) => name === machineInput);

    const submit = {
      email: user.email,
      externalMachineId: machineObj.ipdb_id || machineObj.opdb_id,
      machineImgUrl:
        machineObj.opdb_img || '../../public/images/no-photo-available.webp',
      machineName: machineInput,
      score: scoreInput,
      location: locationInput,
    };

    if (machineInput && locationInput && scoreInput) {
      try {
        addScore(submit);
        console.log('SUBMIT: ', submit);
      } catch (error) {
        console.error(error);
      }
      resetInputs();
      navigate('/history');
    }
  }

  function handleMachineInput(event) {
    setMachineInput(event.target.value);
  }

  function handleLocationInput(event) {
    setLocationInput(event.target.value);
  }

  function handleScoreInput(event) {
    setScoreInput(event.target.value);
  }


  return (
    <div className='container'>
      <NavDisplay user={user} />
      <div className='add-machine-container'>
        <div className='add-title'>Add-a-Score</div>
        <form onSubmit={handleSubmit}>
          <div className='add-input-box'>
            <label className='label' htmlFor='machine-input'>
              Pinball Machine
            </label>

            <input
              name='machine'
              id='machine-input'
              type='text'
              list='games'
              value={machineInput}
              onChange={handleMachineInput}
              placeholder='Name of machine...'
              required
            />
            <datalist id='games'>
              {machines.map(({ name }, i) => (
                <option key={name + i} value={name} />
              ))}
            </datalist>
          </div>

          {/* <AutoComplete machines={machines} /> */}

          <div className='add-input-box'>
            <label className='label' htmlFor='location-input'>
              Machine Location
            </label>

            <input
              name='location'
              id='location-input'
              type='text'
              value={locationInput}
              onChange={handleLocationInput}
              placeholder='Enter a location...'
              required
            />
          </div>

          <div className='add-input-box'>
            <label className='label' htmlFor='score-input'>
              Score
            </label>
            <div className='score-input-imgButton row'>
              <input
                
                name='score'
                id='score-input'
                type='number'
                value={scoreInput}
                onChange={handleScoreInput}
                placeholder='Rad score here...'
                required
              />
              
              <div className='photo-icon-box' >
                <Link to='/photo'>
                  <img className='photo-img' src="/client/public/images/camera-retro.svg" alt="camera button" />
                </Link>
              </div>
              
            </div>
          </div>
         

          <input className='add-submit' type='submit' value='Add' />
        </form>
      </div>
    </div>
  );
}

export default Add;
