import React from 'react';
import { Link } from 'react-router-dom';
import MemberList from '../MemberList';
// import FriendList from '../FriendList';
import s from './groupMembers.module.scss';

function GroupAdd() {
  return (
    <section className={s.groupAdd}>
      <div className={s.innerContainer}>
        <div className={s.groupInfo}>
          <p>group public key: [0x894tr789utyt8ut8t2]</p>
          <p>topic: what to do this weekend</p>
        </div>
        <p className={s.searchText}>search pubkey, name, notes</p>
        <div className={s.createBox}>
          <input type="text" placeholder="enter name of group" />
          <Link className={s.btnCreateGroup} to="/groups/add">create</Link>
        </div>
        <MemberList />
      </div>
    </section>
  );
}

export default GroupAdd;
