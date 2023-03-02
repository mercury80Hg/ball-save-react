import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import DynamicBox from './components/DynamicBox';
import Login from './components/Login';
import Profile from './components/Profile';
import Add from './components/Add';
import UserScoreHistory from './components/UserScoreHistory'

import { userList } from './server/db';







function App() {
  const [currentUser, setCurrentUser] = useState(userList.find(({ userId }) => userId === "12345"))
  console.log("Current USER: ", currentUser)

  return (
    
    <div className="App">
      <div className='dead-div top'></div>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="/dynamic" element={<DynamicBox />} /> */}
          <Route path="/profile" element={<DynamicBox user={currentUser} data={<Profile user={currentUser}  />} />} />
          <Route path="/add" element={<DynamicBox user={currentUser} data={<Add />} />} />
          <Route path="/history" element={<DynamicBox user={currentUser} data={<UserScoreHistory />} />} />
        </Routes>

      <div className='dead-div bottom'></div>
    </div>
  );
}

export default App;
