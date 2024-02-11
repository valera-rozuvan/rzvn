import * as React from 'react';

import './style.scss';

function Loader() {
  return (
    <div className="loader">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" />
      </svg>
    </div>
  );
}

export default Loader;
