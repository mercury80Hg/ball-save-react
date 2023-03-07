import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import DynamicBox from './components/DynamicBox';
import Login from './components/Login';
import Profile from './components/Profile';
import Add from './components/Add';
import UserScoreHistory from './components/History';

import { fetchMachines } from './api/api';
import { fetchUsers } from './api/api';
import Title from './components/Title';
import NavDisplay from './components/NavDisplay';
import Photo from './components/Photo';

export const baseURL = 'http://localhost:3001';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({});
  const [machines, setMachines] = useState([]);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [imgSource, setImgSource] = useState('');

  useEffect(() => {
    async function getMachineData() {
      const result = await fetchMachines();
      setMachines(result.machines);
    }
    getMachineData();
  }, []);
  console.log('Current USER: ', currentUser);
  // console.log('PinMACHINES:', machines);
  console.log('SCORE history:', scoreHistory);

  return (
    <div className='App'>
      <Title />
      <Routes>
        <Route path='/' element={<Login setCurrentUser={setCurrentUser} />} />
        <Route
          path='login'
          element={<Login setCurrentUser={setCurrentUser} />}
        />
        <Route
          path='/add'
          element={
            <Add
              user={currentUser}
              machines={machines}
              scoreHistory={scoreHistory}
              setScoreHistory={setScoreHistory}
              imgSource={imgSource}
              setImgSource={setImgSource}
            />
          }
        />
        <Route
          path='/history'
          element={
            <UserScoreHistory
              user={currentUser}
              scoreHistory={scoreHistory}
              setScoreHistory={setScoreHistory}
            />
          }
        />
        <Route
          path='/photo'
          element={
            <Photo
              user={currentUser}
              imgSource={imgSource}
              setImgSource={setImgSource}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
