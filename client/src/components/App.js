import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(data => {
      setBackendData(data)
      }
    )
  }, [])

  return (
    //<div>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    //</div>
    );

      /*{ {(typeof backendData.users === 'undefined') ? (
        <div>loading...</div>
      ) : (
        <div>
          <h1>Users</h1>
          <ul>
            {backendData.users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  )
} */}

export default App