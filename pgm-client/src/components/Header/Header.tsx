import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Header.scss';

function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <button type="button" onClick={() => navigate('/')}>on main</button>
      <h1 className="header">
        PG Messenger
        <br />
        LOGO
      </h1>
    </header>
  );
}

export default Header;
