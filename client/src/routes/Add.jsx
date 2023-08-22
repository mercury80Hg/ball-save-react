import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavDisplay from '../components/NavDisplay';
import cameraImage from '../images/camera-retro.svg';
import { addScore } from '../api/api';

function Add({ user, machines, setScoreHistory }) {
  const [machineInput, setMachineInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [scoreInput, setScoreInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function resetInputs() {
    setLocationInput('');
    setMachineInput('');
    setScoreInput('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (machineInput && locationInput && scoreInput) {
      setIsLoading(true);

      const machineObj = machines.find(({ name }) => name === machineInput);

      const submit = {
        email: user.email,
        externalMachineId: machineObj.ipdb_id || machineObj.opdb_id,
        machineImgUrl: machineObj.opdb_img || '',
        machineName: machineInput,
        score: scoreInput,
        location: locationInput,
      };
      const newScore = await addScore(submit);

      if (newScore) {
        setScoreHistory((prevHistory) => {
          const existingMachine = prevHistory.find(
            (history) =>
              history.externalMachineId === newScore.machine.externalMachineId
          );

          if (existingMachine) {
            return prevHistory.map((history) =>
              history.externalMachineId === newScore.machine.externalMachineId
                ? { ...history, scores: [...history.scores, newScore.value] }
                : history
            );
          }
          return [
            ...prevHistory,
            {
              externalMachineId: newScore.machine.externalMachineId,
              imgUrl: newScore.machine.imgUrl,
              name: newScore.machine.name,
              scores: [newScore.value],
            },
          ];
        });
        setIsLoading(false);
        resetInputs();
        navigate('/history');
      } else {
        setIsLoading(false);
      }
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

              <div className='photo-icon-box'>
                <Link to='/photo'>
                  <img
                    className='photo-img'
                    src={cameraImage}
                    alt='camera button'
                  />
                </Link>
              </div>
            </div>
          </div>

          <input
            className='add-submit'
            type='submit'
            value='Add'
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
}

export default Add;
