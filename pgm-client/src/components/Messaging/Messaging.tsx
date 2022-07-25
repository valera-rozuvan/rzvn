import React from 'react';
import FooterUser from '../FooterUser';
import s from './messaging.module.scss';

function Messaging() {
  const msgList = [
    {
      name: 'Kate', id: '38poi0y4ti40t3i', msg: 'Hello, Alex?', date: '13:47, 24.07.2022',
    },
    {
      name: 'Kate', id: '38poi0y4ti40t3i', msg: 'How are you?', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y4ti40t3i', msg: 'Hi, i am ok))', date: '13:47, 24.07.2022',
    },
    {
      name: 'Kate', id: '38poi0y4ti40t3i', msg: 'blabla', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y4ti40t3i', msg: 'what?????', date: '13:47, 24.07.2022',
    },
    {
      name: 'Kate', id: '38poi0y4ti40t3i', msg: '))) i have no idea what to write...', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y4ti40t3i', msg: 'so am i blahblah', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y4ti40t3i', msg: ')))))))', date: '13:47, 24.07.2022',
    },
    {
      name: 'Kate', id: '38poi0y4ti40t3i', msg: '))) i have no idea what to write...', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y4ti40t3i', msg: 'so am i blahblah', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y4ti40t3i', msg: ')))))))', date: '13:47, 24.07.2022',
    },
    {
      name: 'Kate', id: '38poi0y4ti40t3i', msg: '))) i have no idea what to write...', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y4ti40t3i', msg: 'so am i blahblah', date: '13:47, 24.07.2022',
    },
    {
      name: 'Alex', id: '120poi0y4ti40t3i', msg: ')))))))', date: '13:47, 24.07.2022',
    },
  ];
  return (
    <>
      <section className={s.msg}>
        <div className={s.innerContainer}>
          {msgList.map((msg) => (msg.name === 'Alex' ? (

            <div>
              <div className={s.nameDateBox}>
                <p className={s.friendName}>{msg.name}</p>
                <p className={s.date}>{msg.date}</p>
              </div>
              <p className={`${s.friendMsg} ${s.box}`}>{msg.msg}</p>
            </div>

          ) : (
            <div className={s.msgBoxUser}>
              <div className={s.nameDateBoxUser}>
                {/* <p className={s.friendName}>{msg.name}</p> */}
                <p className={s.date}>{msg.date}</p>
              </div>
              <p className={`${s.myMsg} ${s.box}`}>{msg.msg}</p>
            </div>
          )))}
        </div>
      </section>
      <FooterUser />
    </>
  );
}

export default Messaging;
