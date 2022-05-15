import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Uptime from './components/Uptime';
import Pgm from './components/Pgm';
import Qadmin from './components/Qadmin';
import Qauth from './components/Qauth';
import NoMatch from './components/NoMatch';

import Projects from './components/Projects';
import About from './components/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/uptime" element={<Uptime />} />
      <Route path="/pgm" element={<Pgm />} />
      <Route path="/qadmin" element={<Qadmin />} />
      <Route path="/qauth" element={<Qauth />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NoMatch />} />

    </Routes>
  );
}

export default App;
