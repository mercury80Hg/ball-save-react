import { Link } from "react-router-dom";

/* Nav Bar and logged in user display.  'burger' is a placeholder
for the dropdown which will contain the links currently just 
sitting there*/

function NavDisplay({ initials, email }) {
  return (
    <div className='nav-box row'>
      <div>burger</div> 
      <Link to='/history' >history</Link>
      <Link to='/add' >add</Link>
      {/* <Link to='/profile' >profile</Link> */}

      <div>{initials}</div>
      <div>{email}</div>
    </div>
  );
}

export default NavDisplay;
