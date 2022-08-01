import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Messaging from './components/Messaging';
import Landing from './components/Landing';
import Login from './components/Login';
import LoginChallenge from './components/LoginChallenge';
import Generator from './components/Generator';
import Profile from './components/Profile';
import Friends from './components/Friends';
import Groups from './components/Groups';
import FriendAdd from './components/FriendAdd';
import FriendEdit from './components/FriendEdit';
import About from './components/About';
import Policy from './components/Policy';
import Contact from './components/Contact';
import NoMatch from './components/NoMatch';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="login/challenge" element={<LoginChallenge />} />
        <Route path="generator" element={<Generator />} />
        <Route path="about" element={<About />} />
        <Route path="policy" element={<Policy />} />
        <Route path="contact" element={<Contact />} />
        <Route path="messaging" element={<Messaging />} />
        <Route path="profile" element={<Profile />} />
        <Route path="friends" element={<Friends />} />
        <Route path="groups" element={<Groups />} />
        <Route path="friends/add" element={<FriendAdd />} />
        <Route path="friends/edit/:id" element={<FriendEdit />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
