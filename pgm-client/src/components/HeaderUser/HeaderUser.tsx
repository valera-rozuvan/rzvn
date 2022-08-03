import React from 'react';
import { useNavigate } from 'react-router-dom';

import s from './headerUser.module.scss';

function HeaderUser() {
  const navigate = useNavigate();
  return (
    <header className={s.header}>
      <div className={s.innerContainer}>
        <button type="button" onClick={() => navigate('/')}>on main</button>
        <h1>
          PG Messenger
          <br />
          LOGO UserPage
        </h1>
      </div>
    </header>
  );
}

export default HeaderUser;
