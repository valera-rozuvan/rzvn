import React from 'react';
import { useNavigate } from 'react-router-dom';
import SuperButton from '../SuperButton';
import s from './profile.module.scss';

function Profile() {
  const navigate = useNavigate();

  function onGenerate() {
    navigate('/generator');
  }
  function onSmth() {
    console.log('clicked on button');
  }
  return (
    <section className={s.profile}>
      <p className={s.greating}>Welcome, user!</p>
      <p className={s.pkTitle}>public key</p>
      <div className={s.keyBox}>
        <p className={s.pk}>0x894tr789utyt8ut8t2...</p>
        <SuperButton text="generate new key" typeStyle="green" actionHandlers={{ onClick: onGenerate }} />
      </div>
      <p className={s.nickname}>nickname</p>
      <input placeholder="user name" />
      <div className={s.linksBox}>
        <SuperButton text="update" typeStyle="purple" actionHandlers={{ onClick: onSmth }} />
        <SuperButton text="delete all data" typeStyle="red" actionHandlers={{ onClick: onSmth }} />
      </div>
    </section>
  );
}

export default Profile;
