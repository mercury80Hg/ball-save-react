import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* Nav Bar and logged in user display.  'burger' is a placeholder
for the dropdown which will contain the links currently just 
sitting there*/

function NavDisplay({ user }) {

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user.email) {
  //     navigate('/login');
  //   }
  // }, [user.email]);


  return (
    <div className='nav-box row'>
        <div className="dropmenu">
          <button className='hamburger-button' >☰</button>
          <div className="dropmenu-content">
            {/* <Link to='/profile' >profile</Link> */}
            <Link to='/history'>history</Link>
            <Link to='/add'>add</Link>
          </div>
        </div>

      <div>{user.initials}</div>
      <div>{user.email && user.email.split('@')[0]}</div>
    </div>
  );
}

export default NavDisplay;
