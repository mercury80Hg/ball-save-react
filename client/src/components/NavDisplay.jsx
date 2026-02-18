import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* Nav Bar and logged in user display.  'burger' is a placeholder
for the dropdown which will contain the links currently just 
sitting there*/

function NavDisplay({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <div className='nav-box row'>
      <div className='dropmenu' ref={dropdownRef}>
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
          <Link to='/games' onClick={() => setIsOpen(false)}>
            games
          </Link>
          <Link to='/add' onClick={() => setIsOpen(false)}>
            add
          </Link>
          <button
            className='logout-button'
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
          >
            logout
          </button>
        </div>
      </div>

      <div>{user.initials}</div>
      <div>{user.email && user.email.split('@')[0]}</div>
    </div>
  );
}

export default NavDisplay;
