import React from 'react';
import NavDisplay from '../components/NavDisplay';

function PinballGame({ user, onLogout }) {
  return (
    <div className='container'>
      <NavDisplay user={user} onLogout={onLogout} />
      <div className='pinball-container'>
        <h2>Pinball Game</h2>
        <p style={{ padding: '0 20px' }}>
          Module placeholder - following exact same patterns as working
          components
        </p>
      </div>
    </div>
  );
}

export default PinballGame;
