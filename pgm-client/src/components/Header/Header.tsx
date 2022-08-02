import React from 'react';
import { useNavigate } from 'react-router-dom';

import s from './Header.module.scss';

function Header() {
  const navigate = useNavigate();
  return (
    <header className={s.header}>
      <div className={s.innerContainer}>
        <button type="button" onClick={() => navigate('/')}>on main</button>
        <h1>
          PG Messenger
          <br />
          LOGO
        </h1>
      </div>
    </header>
  );
}

export default Header;
