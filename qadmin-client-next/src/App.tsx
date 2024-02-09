import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Users from './components/Users';
import SuperAdmins from './components/SuperAdmins';
import Applications from './components/Applications';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/superadmins" element={<SuperAdmins />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
