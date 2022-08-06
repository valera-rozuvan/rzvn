import React from 'react';
import { Link } from 'react-router-dom';
import s from './groupAdd.module.scss';

function GroupAdd() {
  const groupsList = [
    {
      id: '067uoi0y4ti58uy54yt40t3i', key: '0x6wr61rw16wrw11', topic: 'girlfriends b-day',
    },
    {
      id: '753y256iu76i876r830uy38tu', key: '0x8357y92ruu9r2', topic: 'football game event - travel planning',
    },
    {
      id: '894ru904ty43r43tui9', key: '0x0934yu9u2et781e', topic: 'phys100x exam',
    },
    {
      id: '08yut930345y65u2riut94', key: '0x80tr32y083r28yt3', topic: 'dance class',
    },
    {
      id: '0y5i0i43t34yy0uyi54r', key: '0x623t3tkjtgfmvn', topic: '',
    },
    {
      id: 'dngbrji3r576uiu6uu84w3f3', key: '0x394u18ry3g8ghj3y3', topic: 'work',
    },
    {
      id: '6o0u6io23r3rt432t0iy05t40t', key: '0x6724t27ry7283yr8e2', topic: 'home group',
    },
  ];
  return (
    <section className={s.groupAdd}>
      <div className={s.innerContainer}>
        <p className={s.searchText}>topic</p>
        <div className={s.createBox}>
          <input type="text" placeholder="enter name of group" />
          <Link className={s.btnCreateGroup} to="/groups/add">create</Link>
        </div>
        <p className={s.title}>member list</p>
        <p className={s.subtitle}>added</p>
        {groupsList.map((group) => (
          <section key={group.id}>
            <div className={s.groupBox}>
              <p className={s.groupKey}>{group.key}</p>
              <Link to="/" className={s.friendDelete}>delete</Link>
            </div>
            <p className={s.groupTopic}>
              topic:
              {group.topic}
            </p>
          </section>
        ))}
        <p className={s.subtitle}>friend list</p>
        {groupsList.map((group) => (
          <section key={group.id}>
            <div className={s.groupBox}>
              <p className={s.groupKey}>{group.key}</p>
              <Link to="/" className={s.friendAdd}>add</Link>
            </div>
            <p className={s.groupTopic}>
              topic:
              {group.topic}
            </p>
          </section>
        ))}
      </div>
    </section>
    // <section className={s.groupAdd}>
    //   <div className={s.innerContainer}>
    //     <h2 className={s.title}>add group</h2>
    //     <p>topic</p>
    //     <input />
    //     <p>members</p>
    //     <input />
    //     <button type="submit">add</button>
    //   </div>
    // </section>

  );
}

export default GroupAdd;