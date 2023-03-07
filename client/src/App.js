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

export const baseURL = 'http://localhost:3001';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({});
  const [machines, setMachines] = useState([]);
  const [scoreHistory, setScoreHistory] = useState([]);

  useEffect(() => {
    async function getMachineData() {
      const result = await fetchMachines();
      setMachines(result.machines);
    }
    getMachineData();
  }, []);
  console.log('Current USER: ', currentUser);
  // console.log('PinMACHINES:', machines);
  console.log('SCORE history:', scoreHistory)

  return (
    <div className='App'>
      <Title />
      

      <Routes>
        <Route path='/' element={<Login setCurrentUser={setCurrentUser} />} />
        <Route
          path='login'
          element={<Login setCurrentUser={setCurrentUser} />}
        />
        {/* <Route path="/dynamic" element={<DynamicBox />} /> */}
        <Route
          path='/profile'
          element={
            <Profile user={currentUser} />
            // <DynamicBox
            //   user={currentUser}
            //   data={<Profile user={currentUser} />}
            // />
          }
        />
        <Route
          path='/add'
          element={
            <Add
                  user={currentUser}
                  machines={machines}
                  scoreHistory={scoreHistory}
                  setScoreHistory={setScoreHistory}
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
            // <DynamicBox
            //   user={currentUser}
            //   data={
            //     <UserScoreHistory
            //       user={currentUser}
            //       scoreHistory={scoreHistory}
            //       setScoreHistory={setScoreHistory}
            //     />
            //   }
            // />
          }
        />
      </Routes>
      
    </div>
  );
}

export default App;
