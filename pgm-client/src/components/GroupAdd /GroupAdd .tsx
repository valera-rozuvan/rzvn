import React from 'react';
import s from './groupAdd.module.scss';

function GroupAdd() {
  return (
    <section className={s.groupAdd}>
      <div className={s.innerContainer}>
        <h2 className={s.title}>add group</h2>
        <p>topic</p>
        <input />
        <p>members</p>
        <input />
        <button type="submit">add</button>
      </div>
    </section>

  );
}

export default GroupAdd;
