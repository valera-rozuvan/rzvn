import React from 'react';
import FooterUser from '../FooterUser';
import Sender from '../Sender';
import s from './messaging.module.scss';

function Messaging() {
  const msgList = [
    {
      name: 'Kate', id: '38poi0y4t2354234i40t3i34534t4t', msg: 'Hello, Alex?', date: '13:47, 24.07.2022',
    },
    {
      name: 'Kate', id: '38poi0y4ti235340t3i213423sdgf4rt', msg: 'How are you?', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y4ti402452435t3i3e4t4t43', msg: 'Hi, i am ok))', date: '13:47, 24.07.2022',
    },
    {
      name: 'Kate', id: '38poi0y4ti425r3250t3i234trfgrg', msg: 'blabla', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y4ti40t3i456yy45yt', msg: 'what?????', date: '13:47, 24.07.2022',
    },
    {
      name: 'Kate', id: '38poi0y4ti40234t43tt3i', msg: '))) i have no idea what to write...', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y4ti40u65u54yt3i', msg: 'so am i blahblah', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y4ti23r3240t3i', msg: ')))))))', date: '13:47, 24.07.2022',
    },
    {
      name: 'Kate', id: '38poi0y4ti40u456uy54yt3i', msg: '))) i have no idea what to write...', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y4t23r32ri40t3i', msg: 'so am i blahblah', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y45y56u4ti40t3i', msg: ')))))))', date: '13:47, 24.07.2022',
    },
    {
      name: 'Kate', id: '38poi0y4ti4234tr43t0t3i', msg: '))) i have no idea what to write...', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y4t23r3r3ti40t3i', msg: 'so am i blahblah', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y4t2345t43ti40t3i', msg: ')))))))', date: '13:47, 24.07.2022',
    },
  ];
  return (
    <>
      <section className={s.msg}>
        <div className={s.innerContainer}>
          {msgList.map((msg) => (msg.name === 'Alex' ? (

            <div key={msg.id}>
              <div className={s.nameDateBox}>
                <p className={s.friendName}>{msg.name}</p>
                <p className={s.date}>{msg.date}</p>
              </div>
              <p className={`${s.friendMsg} ${s.box}`}>{msg.msg}</p>
            </div>

          ) : (
            <div key={msg.id} className={s.msgBoxUser}>
              <div className={s.nameDateBoxUser}>
                {/* <p className={s.friendName}>{msg.name}</p> */}
                <p className={s.date}>{msg.date}</p>
              </div>
              <p className={`${s.userMsg} ${s.box}`}>{msg.msg}</p>
            </div>
          )))}
        </div>
        <Sender />
      </section>
      <FooterUser />
    </>
  );
}

export default Messaging;
