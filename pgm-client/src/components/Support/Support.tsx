import React from 'react';
import { Link } from 'react-router-dom';
import s from './support.module.scss';

function Support() {
  return (
    <div className={s.support}>
      <p>Do you want to support PG Messenger?</p>
      <div className={s.linksBox}>
        <Link to="/">$1/mo</Link>
        <Link to="/">$5/mo</Link>
        <Link to="/">$25/mo</Link>
      </div>
    </div>
  );
}

export default Support;
