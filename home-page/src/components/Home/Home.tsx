import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Uptime from '../Uptime'
import Pgm from '../Pgm';
import Qadmin from '../Qadmin';
import Qauth from '../Qauth';
import NoMatch from '../NoMatch';

import Projects from '../Projects';

import './style.scss';

function Home() {
  return (
    <div className="App">
      <div className="Header">Home
      </div>
      <div className="Body">
			<ul>
          <li><Link to="/projects">Projects</Link></li>
					<li><Link to="/about">About</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Home;