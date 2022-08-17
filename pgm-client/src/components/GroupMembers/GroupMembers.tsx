import React from 'react';
import MemberList from '../MemberList';
import SuperInput from '../SuperInput';
import s from './groupMembers.module.scss';

function GroupAdd() {
  return (
    <section className={s.groupAdd}>
      <div className={s.innerContainer}>
        <div className={s.groupInfo}>
          <p>group public key: [0x894tr789utyt8ut8t2]</p>
          <p>topic: what to do this weekend</p>
        </div>
        <div className={s.createBox}>
          <SuperInput page="friends" />
        </div>
        <MemberList />
      </div>
    </section>
  );
}

export default GroupAdd;
