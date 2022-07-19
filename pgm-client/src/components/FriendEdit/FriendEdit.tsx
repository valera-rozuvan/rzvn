import React from 'react';

import FooterUser from '../FooterUser';
import s from './friendEdit.module.scss';

function Friends() {
  return (
    <>
      <section className={s.friendEdit}>
        <div className={s.innerContainer}>
          <h2 className={s.title}>edit friend</h2>
          <p className={s.pkTitle}>public key</p>
          <p className={s.pk}>0x894tr789utyt8ut8t2...</p>
          <p>Joey</p>
          <p>notes</p>
          <input />
          <div className={s.btnBlock}>
            <button className={s.update} type="submit">update</button>
            <button className={s.delete} type="submit">delete</button>
          </div>
        </div>
      </section>
      <FooterUser />
    </>
  );
}

export default Friends;
