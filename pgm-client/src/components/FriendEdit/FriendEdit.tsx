import React from 'react';
import { Link } from "react-router-dom"
import FooterUser from '../FooterUser';

function Friends() {
  return (
    <>
    <h2>edt friend</h2>
    <p>public key</p>
    <p>0x894tr789utyt8ut8t2...</p>
    <p>nickname</p>
    <p>Joey</p>
    <p>notes</p>
    <input></input>
    <button type="submit">update</button>
    <button type="submit">delete</button>
      <FooterUser />
    </>
  );
}

export default Friends;
