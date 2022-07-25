import React from 'react';
import { Link } from 'react-router-dom';
import FooterUser from '../FooterUser';
import s from './groups.module.scss';

function Groups() {
  const groupsList = [
    {
      id: '067uoi0y4ti40t3i', key: '0x6wr61rw16wrw11', topic: 'girlfriends b-day',
    },
    {
      id: '753y2r830uy38tu', key: '0x8357y92ruu9r2', topic: 'football game event - travel planning',
    },
    {
      id: '894ru904tyui9', key: '0x0934yu9u2et781e', topic: 'phys100x exam',
    },
    {
      id: '08yut9302riut94', key: '0x80tr32y083r28yt3', topic: 'dance class',
    },
    {
      id: '0y5i0iy0uyi54r', key: '0x623t3tkjtgfmvn', topic: '',
    },
    {
      id: 'dngbrji3ru84w3f3', key: '0x394u18ry3g8ghj3y3', topic: 'work',
    },
    {
      id: '6o0u6io0iy05t40t', key: '0x6724t27ry7283yr8e2', topic: 'home group',
    },
  ];
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
          <p className={s.curretGroupText}>all groups:</p>
          {groupsList.map((group) => (
            <section>
              <div className={s.groupBox}>
                <p className={s.groupKey}>{group.key}</p>
                <div className={s.btnBox}>
                  <Link to="/" className={s.groupMembers}>members</Link>
                  <Link to="/" className={s.groupLeave}>leave</Link>
                </div>
              </div>
              <p className={s.groupTopic}>
                topic:
                {group.topic}
              </p>
            </section>
          ))}
        </div>
      </section>
      <FooterUser />
    </>
  );
}

export default Groups;
