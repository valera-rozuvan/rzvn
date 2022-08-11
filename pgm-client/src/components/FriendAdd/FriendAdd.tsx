import React from 'react';
import SuperButton from '../SuperButton';
import s from './friendAdd.module.scss';

function FriendAdd() {
  function onSubmitNewFriend() {
    console.log('submit new friend');
  }
  return (
    <section className={s.friendAdd}>
      <div className={s.innerContainer}>
        <h2 className={s.title}>add friend</h2>
        <p>public key</p>
        <input />
        <p>notes</p>
        <input />
        <div className={s.addBtnBox}>
          <SuperButton text="add" typeStyle="purple" actionHandlers={{ onClick: onSubmitNewFriend }} />
        </div>
      </div>
    </section >

  );
}

export default FriendAdd;
