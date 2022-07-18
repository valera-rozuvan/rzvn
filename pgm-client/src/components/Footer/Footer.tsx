import React from 'react';
import { Link } from 'react-router-dom';

import s from './footer.module.scss';

function Footer() {
  return (
    <footer className={s.footer}>
      <ul>
        <li><Link to="/">about</Link></li>
        <li><Link to="/">policy</Link></li>
        <li><Link to="/">contact</Link></li>
      </ul>
    </footer>
  );
}

export default Footer;
