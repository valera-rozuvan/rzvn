import React from 'react';
import { Link } from 'react-router-dom';

function FooterUser() {
  return (
    <div>
      <ul>
        <li><Link to="/msg">msg</Link></li>
        <li><Link to="/friends">friends</Link></li>
        <li><Link to="/groups">groups</Link></li>
        <li><Link to="/rofile">profile</Link></li>
        <li><button type="submit">logout</button></li>
      </ul>
    </div>
  );
}

export default FooterUser;
