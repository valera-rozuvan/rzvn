import React from 'react';
import FooterUser from '../FooterUser';
import s from './friendAdd.module.scss';

function FriendAdd() {
  return (
    <>
      <section className={s.friendAdd}>
        <div className={s.innerContainer}>
          <h2 className={s.title}>add friend</h2>
          <p>public key</p>
          <input />
          <p>notes</p>
          <input />
          <button type="submit">add</button>
        </div>
      </section>
      <FooterUser />
    </>
  );
}

export default FriendAdd;
