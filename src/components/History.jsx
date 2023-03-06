import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchScores } from '../api/api';
import AddButton from './AddButton';

function UserScoreHistory({ user, scoreHistory, setScoreHistory }) {
 
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.email) {
      navigate('/login')
    } else {
      async function getData() {
        const result = await fetchScores(user.email);
        const machineHistory = {}

        result.forEach((el) => {
          if (machineHistory[el.machine._id]) {
            machineHistory[el.machine._id].scores.push(el.value)
          } else {
            machineHistory[el.machine._id] = {...el.machine, scores: [el.value]}
          }
        })
        setScoreHistory(Object.values(machineHistory));
      }
      getData();
    }
  }, []);

  console.log('SCORE HISTORY: ', scoreHistory);

  return (
    <div className='history-container'>
        {scoreHistory.map((el, i) => (
          <div key={i} className='score-card'>
            <img className='score-card-img' src={el.imgUrl || "images/no-photo-available.webp"} alt=''></img>
            <div className='score-card-info-box'>
              <div>{el.name}</div>
              <div>{el.location}</div>
              <ul>
                {el.scores.map((score, i) => <li key={i}>{score.toLocaleString()}</li>)}
              </ul>
            </div>
          </div>
        ))} 
        <AddButton />
    </div>
  );
}

export default UserScoreHistory;
