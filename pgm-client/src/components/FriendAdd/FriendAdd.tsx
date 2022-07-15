import React from 'react';
import { Link } from "react-router-dom"
import FooterUser from '../FooterUser';

function Friends() {
  return (
    <>
    <h2>add friend</h2>
    <p>public key</p>
    <input></input>
    <p>notes</p>
    <input></input>
    <button type="submit">add</button>
      <FooterUser />
    </>
  );
}

export default Friends;
