import { Link } from 'react-router-dom';

/* Nav Bar and logged in user display.  'burger' is a placeholder
for the dropdown which will contain the links currently just 
sitting there*/

function NavDisplay({ initials, email }) {
  const shortEmail = email.split('@')[0]
  return (
    <div className='nav-box row'>
        <div class="dropdown">
          <button className='hamburger-button' >☰</button>
          <div class="dropdown-content">
            {/* <Link to='/profile' >profile</Link> */}
            <Link to='/history'>history</Link>
            <Link to='/add'>add</Link>
          </div>
        </div>

      <div>{initials}</div>
      <div>{shortEmail}</div>
    </div>
  );
}

export default NavDisplay;
