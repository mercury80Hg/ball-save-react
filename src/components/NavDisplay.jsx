function NavDisplay({ initials, email }) {
  return (
    <div className='nav-box row'>
      <div>burger</div>
      <div>{initials}</div>
      <div>{email}</div>
    </div>
  );
}

export default NavDisplay;
