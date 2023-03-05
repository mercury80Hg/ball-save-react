import { Link } from "react-router-dom";

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
