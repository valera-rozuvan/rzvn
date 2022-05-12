import React from 'react';
import { Link } from 'react-router-dom';

function Projects() {
  return (
    <div>
      <ul>
        <li><Link to="/uptime">Uptime</Link></li>
        <li><Link to="/pgm">PGM</Link></li>
        <li><Link to="/qadmin">Q admin</Link></li>
        <li><Link to="/qauth">Q auth</Link></li>
      </ul>
    </div>
  );
}

export default Projects;
