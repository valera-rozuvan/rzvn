import React from 'react';
import { Link } from "react-router-dom"

import Header from '../Header';
import Footer from '../Footer';
import Support from '../Support';
import FooterUser from '../FooterUser';


function Profile() {
  return (
    <>
      <p>Welcome, user!</p>
      <p>public key</p>
      <p>0x894tr789utyt8ut8t2...</p>
      <p>nickname</p>
      <input placeholder='user name'></input>
      <button type="submit">update</button>
      <button type="submit">delete all data</button>
      <Support/>
      <FooterUser/>
    </>
  );
}

export default Profile;
