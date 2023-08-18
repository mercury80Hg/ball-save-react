import AddButton from '../components/AddButton';
import NavDisplay from '../components/NavDisplay';
import fallbackImage from '../images/pinball-game-arcade-console-design-illustration_222550-174.jpg.avif';

function UserScoreHistory({ user, scoreHistory }) {
  return (
    <div className='container'>
      <NavDisplay user={user} />
      <div className='history-container'>
        {scoreHistory.length
          ? scoreHistory.map((el, i) => (
              <div key={i} className='score-card'>
                <img
                  className='score-card-img'
                  src={el.imgUrl || fallbackImage}
                  alt=''
                ></img>
                <div className='score-card-info-box'>
                  <div style={{ textAlign: 'center' }}>{el.name}</div>
                  {/* <div>{el.location}</div> */}
                  <ul>
                    {el.scores?.map((score, i) => (
                      <li key={i + 'a'}>{score.toLocaleString()}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          : 'No scores found yet, launch the ball!'}
      </div>
      <AddButton />
    </div>
  );
}

export default UserScoreHistory;
