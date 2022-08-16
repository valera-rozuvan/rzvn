import React from 'react';
import SuperButton from '../SuperButton';
import SuperInput from '../SuperInput';
import s from './friendEdit.module.scss';

function FriendEdit() {
  function onUpdateFriend() {
    console.log('update friend');
  }
  function onDeleteInfo() {
    console.log('delete friends info');
  }
  return (
    <section className={s.friendEdit}>
      <div className={s.innerContainer}>
        <h2 className={s.title}>edit friend</h2>
        <p className={s.pkTitle}>public key</p>
        <p className={s.pk}>0x894tr789utyt8ut8t2...</p>
        <p className={s.userName}>Joey</p>
        <SuperInput page="friendNotes" />
        <div className={s.btnsBox}>
          <SuperButton text="update" typeStyle="purple" actionHandlers={{ onClick: onUpdateFriend }} />
          <SuperButton text="delete" typeStyle="red" actionHandlers={{ onClick: onDeleteInfo }} />
        </div>
      </div>
    </section>
  );
}

export default FriendEdit;
