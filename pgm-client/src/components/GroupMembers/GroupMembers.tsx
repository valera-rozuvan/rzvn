import React from 'react';
import { Link } from 'react-router-dom';
import FriendList from '../FriendList';
import s from './groupMembers.module.scss';

function GroupAdd() {
  function addFriend() {
    console.log('add friend from group members');
  }
  const groupsList = [
    {
      id: '067uoi0y4ti58uy54yt40t3i', name: 'Monica', key: '0x6wr61rw16wrw11', topic: 'girlfriends b-day',
    },
    {
      id: '753y256iu76i876r830uy38tu', name: 'Maria', key: '0x8357y92ruu9r2', topic: 'football game event - travel planning',
    },
    {
      id: '894ru904ty43r43tui9', name: 'Victor', key: '0x0934yu9u2et781e', topic: 'phys100x exam',
    },
    {
      id: '08yut930345y65u2riut94', name: 'Ben', key: '0x80tr32y083r28yt3', topic: 'dance class',
    },
    {
      id: '0y5i0i43t34yy0uyi54r', name: 'Marta', key: '0x623t3tkjtgfmvn', topic: '',
    },
    {
      id: 'dngbrji3r576uiu6uu84w3f3', name: 'Lola', key: '0x394u18ry3g8ghj3y3', topic: 'work',
    },
    {
      id: '6o0u6io23r3rt432t0iy05t40t', name: 'Peter', key: '0x6724t27ry7283yr8e2', topic: 'home group',
    },
  ];
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
        <div className={s.subtitleFilterBox}>
          <p className={s.subtitle}>members of group </p>
          {/* <input type="search" placeholder="enter name of friend" /> */}
        </div>
        <FriendList />
        {/* {groupsList.map((friend) => (
          <section key={friend.id}>
            <div className={s.groupBox}>
              <p className={s.groupKey}>{friend.name}</p>
              <p className={s.friendKey}>{friend.key}</p>
              <Link to="/" className={s.friendAdd}>add</Link>
            </div>
            <p className={s.groupTopic}>
              topic:
              {friend.topic}
            </p>
          </section>
        ))} */}
      </div>
    </section>
  );
}

export default GroupAdd;
