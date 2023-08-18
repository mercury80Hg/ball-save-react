import { Link } from 'react-router-dom';
import pinballImage from '../images/black-pinball-trans.png';

/* Big metallic ball/button that is a persistent quick button to
 navigate to the add-score screen */

function AddButton({ shadow }) {
  return (
    <Link to='/add' className=' add-btn' title='Add a score'>
      <img className='pinBall' src={pinballImage} alt='add a score' />
    </Link>
  );
}

export default AddButton;
