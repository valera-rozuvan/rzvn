import React from 'react';
import{Link} from "react-router-dom"


function Footer() {
  return (
    <div>
      <ul>
        <li><Link to="/">about</Link></li>
        <li><Link to="/">policy</Link></li>
        <li><Link to="/">contact</Link></li>
      </ul>
    </div>
  );
}

export default Footer;
