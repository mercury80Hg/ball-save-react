import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './routes/Login';
import Add from './routes/Add';
import UserScoreHistory from './routes/History';

import { fetchMachines, fetchScores } from './api/api';
import Title from './components/Title';
import Photo from './routes/Photo';

// Secure sessionStorage helpers (clears when browser closes)
const STORAGE_KEY = 'ballSaveUser';

const secureStorage = {
  getUser: () => {
    try {
      const user = sessionStorage.getItem(STORAGE_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return null;
    }
  },

  setUser: (user) => {
    try {
      // Only store essential user data (no sensitive info)
      const safeUser = {
        _id: user._id,
        initials: user.initials,
        email: user.email,
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    } catch (error) {
      console.error('Error writing to sessionStorage:', error);
    }
  },

  clearUser: () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  },
};

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [machines, setMachines] = useState([]);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [imgSource, setImgSource] = useState('');

  // Initialize user state from localStorage on app load
  useEffect(() => {
    const storedUser = secureStorage.getUser();
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  // Create a wrapper function to handle user state changes
  const handleSetCurrentUser = (user) => {
    setCurrentUser(user);
    if (user && user.email) {
      secureStorage.setUser(user);
    } else {
      secureStorage.clearUser();
    }
  };

  // Logout function
  const handleLogout = () => {
    handleSetCurrentUser({});
    setScoreHistory([]);
  };

  useEffect(() => {
    async function getMachineData() {
      const result = await fetchMachines();
      setMachines(result.machines);
    }
    getMachineData();
  }, []);

  useEffect(() => {
    if (currentUser.email) {
      async function getData() {
        const result = await fetchScores(currentUser.email);
        const machineHistory = {};

        result.forEach((el) => {
          if (machineHistory[el.machine._id]) {
            machineHistory[el.machine._id].scores.push(el.value);
          } else {
            machineHistory[el.machine._id] = {
              ...el.machine,
              scores: [el.value],
            };
          }
        });

        setScoreHistory(Object.values(machineHistory));
      }

      getData();
    }
  }, [currentUser]);

  return (
    <div className='App'>
      <Title currentUser={currentUser} onLogout={handleLogout} />
      <Routes>
        <Route
          path='/'
          element={<Login setCurrentUser={handleSetCurrentUser} />}
        />
        <Route
          path='login'
          element={<Login setCurrentUser={handleSetCurrentUser} />}
        />
        {currentUser.email ? (
          <>
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
          </>
        ) : null}
        <Route
          path='*'
          element={<Login setCurrentUser={handleSetCurrentUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
