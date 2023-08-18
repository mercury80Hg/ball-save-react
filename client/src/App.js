import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './routes/Login';
import Add from './routes/Add';
import UserScoreHistory from './routes/History';

import { fetchMachines, fetchScores } from './api/api';
import Title from './components/Title';
import Photo from './routes/Photo';

function App() {
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

  useEffect(() => {
    console.log(currentUser);
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
      <Title />
      <Routes>
        <Route path='/' element={<Login setCurrentUser={setCurrentUser} />} />
        <Route
          path='login'
          element={<Login setCurrentUser={setCurrentUser} />}
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
        <Route path='*' element={<Login setCurrentUser={setCurrentUser} />} />
      </Routes>
    </div>
  );
}

export default App;
