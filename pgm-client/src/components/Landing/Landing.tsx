import React from 'react';
import { useNavigate } from 'react-router-dom';
import SuperButton from '../SuperButton/SuperButton';

import s from './landing.module.scss';

function Landing() {
  const navigate = useNavigate();

  function onMsgStart() {
    console.log('start msg'); // eslint-disable-line
    navigate('/login');
  }
  return (
    <section className={s.landing}>
      <p>
        Minimalistic, p2p encrypted, messaging system.
        <br />
        Browser client, CLI client, open API available.
        <br />
        Anonymous.
      </p>
      <div className={s.linkBox}>
        <SuperButton text="start messaging" typeStyle="purple" actionHandlers={{ onClick: onMsgStart }} />
      </div>
    </section>

  );
}

export default Landing;
