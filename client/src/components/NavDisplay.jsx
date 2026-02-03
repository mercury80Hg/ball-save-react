import { useState } from 'react';
import { Link } from 'react-router-dom';

/* Nav Bar and logged in user display.  'burger' is a placeholder
for the dropdown which will contain the links currently just 
sitting there*/

function NavDisplay({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='nav-box row'>
      <div className='dropmenu'>
        <button
          className={`hamburger-button ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className='hamburger-line'></span>
          <span className='hamburger-line'></span>
          <span className='hamburger-line'></span>
        </button>
        <div className={`dropmenu-content ${isOpen ? 'show' : ''}`}>
          {/* <Link to='/profile' >profile</Link> */}
          <Link to='/history' onClick={() => setIsOpen(false)}>
            history
          </Link>
          <Link to='/add' onClick={() => setIsOpen(false)}>
            add
          </Link>
        </div>
      </div>

      <div>{user.initials}</div>
      <div>{user.email && user.email.split('@')[0]}</div>
    </div>
  );
}

export default NavDisplay;
