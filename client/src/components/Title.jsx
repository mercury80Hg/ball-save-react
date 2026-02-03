function Title({ currentUser, onLogout }) {
  return (
    <div className='ball-save-title '>
      <div className='ball-save-title login-main-title'>Ball Save</div>
      {currentUser?.email && (
        <button
          onClick={onLogout}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgb(163, 29, 29)',
            color: 'orange',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '20px',
            fontFamily: 'dotrice',
            fontSize: '2vh',
            cursor: 'pointer',
            borderStyle: 'outset',
            borderTop: 'solid 1px rgb(33, 33, 33)',
            borderLeft: 'solid 1px rgb(33, 33, 33)',
            borderBottom: 'solid 1px rgb(118, 118, 118)',
            borderRight: 'solid 1px rgb(118, 118, 118)',
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Title;
