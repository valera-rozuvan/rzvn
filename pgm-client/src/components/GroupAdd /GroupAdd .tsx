import React from 'react';
// import { useNavigate } from 'react-router-dom';
import SuperButton from '../SuperButton';
import FriendListGroup from '../FriendListGroup';
import MemberList from '../MemberList/MemberList';
import SuperInput from '../SuperInput';
import s from './groupAdd.module.scss';

function GroupAdd() {
  // const navigate = useNavigate();
  function onSubmitCreatedGroup() {
    console.log('ceated new group'); // eslint-disable-line
  }
  return (
    <section className={s.groupAdd}>
      <div className={s.innerContainer}>
        <div className={s.createBox}>
          <SuperInput page="addGroup" />
          <div className={s.btnCreateGroupBox}>
            <SuperButton text="create" typeStyle="green" actionHandlers={{ onClick: onSubmitCreatedGroup }} />
          </div>
        </div>
        <div className={s.subtitleFilterBox}>
          <p className={s.subtitle}>group members list</p>
          <SuperInput page="addGroupFilter" />
        </div>
        <MemberList />
        <div className={s.subtitleFilterBox}>
          <p className={s.subtitle}>friend list</p>
          <SuperInput page="addGroupFilter" />
        </div>
        <FriendListGroup />
      </div>
    </section>
  );
}

export default GroupAdd;
