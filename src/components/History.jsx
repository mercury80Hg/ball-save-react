import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchScores } from '../api/api';

function UserScoreHistory({ user }) {
  const [scoreHistory, setScoreHistory] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.email) {
      // navigate them to login
      navigate('/login')
    } else {
      async function getData() {
        const result = await fetchScores(user.email);
        setScoreHistory(result);
      }
      getData();
    }
  }, [user.email]);

  console.log('SCORE HISTORY: ', scoreHistory);

  return (
    <div className='history-container'>
      <div className='score-card'>
        {scoreHistory.map((el) => (
          <img className='score-card-img' src={el.machine.imgUrl} alt=''></img>
        ))}
      </div>
    </div>
  );
}

export default UserScoreHistory;
