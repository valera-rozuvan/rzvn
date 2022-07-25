import React from 'react';
import { Link } from 'react-router-dom';
import s from './sender.module.scss';

function Sender() {
  return (
    <div className={s.sender}>
      <div className={s.innerContainer}>
        <input />
        <div>
          <Link to="/" className={`${s.btn} ${s.send}`}>send</Link>
          <Link to="/" className={`${s.btn} ${s.menu}`}>menu</Link>
        </div>
      </div>
    </div>
  );
}

export default Sender;
