import React from 'react';
import { Link } from 'react-router-dom';
import FooterUser from '../FooterUser';

import s from './profile.module.scss';

function Profile() {
  return (
    <>
      <section className={s.profile}>
        <p className={s.greating}>Welcome, user!</p>
        <p className={s.pkTitle}>public key</p>
        <div className={s.keyBox}>
          <p className={s.pk}>0x894tr789utyt8ut8t2...</p>
          <Link to="/generator" className={s.generateBtn}>generate new key</Link>
        </div>
        <p className={s.nickname}>nickname</p>
        <input placeholder="user name" />
        <div className={s.btnBox}>
          <button className={s.btnUpdate} type="submit">update</button>
          <button className={s.btnDelete} type="submit">delete all data</button>
        </div>
      </section>
      <FooterUser />

    </>
  );
}

export default Profile;
