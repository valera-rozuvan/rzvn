import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Root from './components/Root';
import Auth from './components/Auth';
import Login from './components/Login';
import Broken from './components/Broken';
import NoMatch from './components/NoMatch';

import './style.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        SSO Auth
      </header>

      <div>
        <Routes>
          <Route index element={<Root />} />
          <Route path="auth" element={<Auth />} />
          <Route path="login" element={<Login />} />
          <Route path="broken" element={<Broken />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
