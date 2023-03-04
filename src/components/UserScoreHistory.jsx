import { useEffect, useState } from 'react';
import { fetchScores } from '../api/api';

function UserScoreHistory({ user }) {
  const [scoreHistory, setScoreHistory] = useState([]);

  useEffect(() => {
    async function getData() {
      const result = await fetchScores(user.email);
      setScoreHistory(result);
    }
    getData();
  }, [user.email]);

  console.log('SCORE HISTORY: ', scoreHistory);

  return (
    <div>
      {scoreHistory.map((el) => (
        <img src={el.machine.imgUrl} alt=''></img>
      ))}
    </div>
  );
}

export default UserScoreHistory;
