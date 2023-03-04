import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import DynamicBox from './components/DynamicBox';
import Login from './components/Login';
import Profile from './components/Profile';
import Add from './components/Add';
import UserScoreHistory from './components/UserScoreHistory';

// import { userList } from './db';
import { fetchMachines } from './api/api';
import { fetchUsers } from './api/api';

export const baseURL = 'http://localhost:3001';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    async function getMachineData() {
      const result = await fetchMachines();
      setMachines(result.machines);
    }
    getMachineData();
  }, []);
  // console.log('Current USER: ', currentUser);
  // console.log('PinMACHINES:', machines);

  useEffect(() => {
    getUsersData();
  }, []);
  console.log('USERs: ', users);

  async function getUsersData() {
    const result = await fetchUsers();
    setUsers(result);
  }

  return (
    <div className='App'>
      

      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='login'
          element={
            <Login
              users={users}
              setCurrentUser={setCurrentUser}
              setUsers={setUsers}
              getUsers={getUsersData}
            />
          }
        />
        {/* <Route path="/dynamic" element={<DynamicBox />} /> */}
        <Route
          path='/profile'
          element={
            <DynamicBox
              user={currentUser}
              data={<Profile user={currentUser} />}
            />
          }
        />
        <Route
          path='/add'
          element={
            <DynamicBox
              user={currentUser}
              data={<Add user={currentUser} machines={machines} />}
            />
          }
        />
        <Route
          path='/history'
          element={
            <DynamicBox
              user={currentUser}
              data={<UserScoreHistory user={currentUser} />}
            />
          }
        />
      </Routes>

 
    </div>
  );
}

export default App;
