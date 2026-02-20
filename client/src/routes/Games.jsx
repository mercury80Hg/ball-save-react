import React from 'react';
import NavDisplay from '../components/NavDisplay';
import PinballGame from '../components/PinballGame';

function Games({ user, onLogout }) {
  return (
    <div className='container'>
      <NavDisplay user={user} onLogout={onLogout} />
      <div className='pinball-container'>
        <h2>Pinball Game</h2>
        <PinballGame user={user} onLogout={onLogout} />
      </div>
    </div>
  );
}

export default Games;
