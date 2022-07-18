import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from './components/Landing';
import Login from './components/Login';
import Profile from './components/Profile';
import Friends from './components/Friends';
import FriendAdd from './components/FriendAdd';
import FriendEdit from './components/FriendEdit';
import NoMatch from './components/NoMatch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/friendAdd" element={<FriendAdd />} />
      <Route path="/friendEdit" element={<FriendEdit />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
