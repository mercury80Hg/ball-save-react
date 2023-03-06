import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../App';
import { fetchScores } from '../api/api';

// import AutoComplete from './AutoComplete';

function Add({ user, machines }) {
  console.log(user);
  const [machineInput, setMachineInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [scoreInput, setScoreInput] = useState('');
  
  const navigate = useNavigate()


  useEffect(() => { 
    if (!user.email) {
      navigate('/login')
    } else {
      async function getData() {
        const result = await fetchScores(user.email);
        
      }
      getData();
    }
  }, [user.email]);


  async function addScore(event) {
    try {
      const score = await fetch(baseURL + '/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(event)
      });
    const result = await score.json();
    return result
    } catch(error) {
      console.log(error)
    }
  }

  /*  TODO: Finish figuring out where you want the score state
  data to be. */

  // async function updateScore(event) {
  //   try {
  //     const additionalScore = await fetch(baseURL + '/score', {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json'},
  //       body: JSON.stringify(event)
  //     });
  //   const result = await score.json();
  //   return result
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }

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
      setLocationInput('');
      setMachineInput('');
      setScoreInput('');
      navigate('/history')
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
    <div className='add-machine-container'>
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
            placeholder='Type a pinball machine...'
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
            placeholder='Type a location...'
            required
          />
        </div>

        <div className='add-input-box'>
          <label className='label' htmlFor='score-input'>
            Score
          </label>

          <input
            name='score'
            id='score-input'
            type='text'
            value={scoreInput}
            onChange={handleScoreInput}
            placeholder='Put that rad score here...'
            required
          />
        </div>

        <input className='add-submit' type='submit' value='Add' />
      </form>
    </div>
  );
}

export default Add;
