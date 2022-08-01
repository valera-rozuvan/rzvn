import React from 'react';
import { Link } from 'react-router-dom';

import s from './landing.module.scss';

function Landing() {
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
        <Link to="/login">start messaging</Link>
      </div>
    </section>

  );
}

export default Landing;
