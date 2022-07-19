import React from 'react';
import { Link } from 'react-router-dom';
import s from './footerUser.module.scss';

function FooterUser() {
  return (
    <footer className={s.footer}>
      <ul>
        <li><Link to="/messaging">msg</Link></li>
        <li><Link to="/friends">friends</Link></li>
        <li><Link to="/groups">groups</Link></li>
        <li><Link to="/profile">profile</Link></li>
        <li><Link to="/">logout</Link></li>
      </ul>
    </footer>
  );
}

export default FooterUser;
