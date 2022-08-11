import React from 'react';
// import { useNavigate } from 'react-router-dom';
import SuperButton from '../SuperButton';
import FriendList from '../FriendList/FriendList';
import MemberList from '../MemberList/MemberList';
import s from './groupAdd.module.scss';

function GroupAdd() {
  // const navigate = useNavigate();
  function onSubmitCreatedGroup() {
    console.log('ceated new group');
  }
  return (
    <section className={s.groupAdd}>
      <div className={s.innerContainer}>
        <p className={s.searchText}>group topic</p>
        <div className={s.createBox}>
          <input type="text" placeholder="enter name of group" />
          <div className={s.btnCreateGroupBox}>
            <SuperButton text="create" typeStyle="green" actionHandlers={{ onClick: onSubmitCreatedGroup }} />
          </div>
        </div>
        <div className={s.subtitleFilterBox}>
          <p className={s.subtitle}>group members list</p>
          <input type="search" placeholder="enter name of friend" />
        </div>
        <MemberList />
        <div className={s.subtitleFilterBox}>
          <p className={s.subtitle}>friend list</p>
          <input type="search" placeholder="enter name of friend" />
        </div>
        <FriendList />
      </div>
    </section>
  );
}

export default GroupAdd;
