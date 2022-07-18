import React from 'react';
import { Link } from 'react-router-dom';

import styles from './footer.module.scss';

function Footer() {
  return (
    <div className={styles.footer}>
      <ul>
        <li><Link to="/">about</Link></li>
        <li><Link to="/">policy</Link></li>
        <li><Link to="/">contact</Link></li>
      </ul>
    </div>
  );
}

export default Footer;
