import React from 'react';
import SuperButton from '../SuperButton';
import SuperInput from '../SuperInput';

import s from './friendAdd.module.scss';

function FriendAdd() {
  function onSubmitNewFriend() {
    console.log('submit new friend');
  }
  return (
    <section className={s.friendAdd}>
      <div className={s.innerContainer}>
        <h2 className={s.title}>add friend</h2>
        <SuperInput page="friendPublicKey" />
        <SuperInput page="friendNotes" />
        <div className={s.addBtnBox}>
          <SuperButton text="add" typeStyle="purple" actionHandlers={{ onClick: onSubmitNewFriend }} />
        </div>
      </div>
    </section>
  );
}

export default FriendAdd;
