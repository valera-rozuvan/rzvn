import React from 'react';
import { Link } from 'react-router-dom';
import FooterUser from '../FooterUser';
import s from './groups.module.scss';

function Groups() {
  return (
    <>
      <section className={s.groups}>
        <div className={s.innerContainer}>
          <p className={s.searchText}>search pubkey, topics</p>
          <div className={s.createBox}>
            <input type="text" placeholder="enter name of group" />
            <Link className={s.btnCreateGroup} to="/friends/add">create group</Link>
          </div>
          <p className={s.curretGroupText}>currently chatting in group:</p>
          <section>
            <div className={s.groupBox}>
              <p className={s.groupKey}>[0x894tr789utyt8ut8t2]</p>
              <div className={s.btnBox}>
                <Link to="/" className={s.groupMembers}>members</Link>
                <Link to="/" className={s.groupLeave}>leave</Link>
              </div>
            </div>
            <p className={s.groupTopic}>
              topic: what to do this weekend
            </p>
          </section>
        </div>
      </section>
      <FooterUser />
    </>
  );
}

export default Groups;
