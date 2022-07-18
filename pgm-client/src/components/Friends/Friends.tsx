import React from 'react';
import { Link } from 'react-router-dom';
import FooterUser from '../FooterUser';

function Friends() {
  return (
    <>
      <p>search pubkey, name, notes</p>
      <input />
      <Link to="/friendAdd">add friend</Link>
      <section>
        <p>currently chatting with friend:</p>
        <p>max</p>
        <p>0x894tr789utyt8ut8t2...</p>
        <Link to="/friendEdit">edit</Link>
        <p>notes: friend from work</p>
      </section>

      <section>
        <p>all friends</p>
        <p>robert</p>
        <p>0x15ere6et71e72ytr2d...</p>
        <Link to="/friendEdit">edit</Link>
        <p>notes: brother</p>
      </section>

      <FooterUser />
    </>
  );
}

export default Friends;
