import React from 'react';
import { Link } from 'react-router-dom';
import FooterUser from '../FooterUser';
// import s from './friends.module.scss';

function Friends() {
  const friendList = [
    {
      name: 'Sophie', id: '067uoi0y4ti40t3i', key: '0x6wr61rw16wrw11', notes: 'girlfriend',
    },
    {
      name: 'Max', id: '753y2r830uy38tu', key: '0x8357y92ruu9r2', notes: 'friend from work',
    },
    {
      name: 'Robert', id: '894ru904tyui9', key: '0x0934yu9u2et781e', notes: 'room mate',
    },
    {
      name: 'Jackie', id: '08yut9302riut94', key: '0x80tr32y083r28yt3', notes: 'little sweet sister',
    },
    {
      name: 'Shaun', id: '0y5i0iy0uyi54r', key: '0x623t3tkjtgfmvn', notes: '',
    },
    {
      name: 'Debbie', id: 'dngbrji3ru84w3f3', key: '0x394u18ry3g8ghj3y3', notes: 'teacher in school',
    },
    {
      name: 'Britney', id: '6o0u6io0iy05t40t', key: '0x6724t27ry7283yr8e2', notes: 'Spears :-)',
    },
  ];
  const currentFriendId = '753y2r830uy38tu';
  const currentFriend = friendList.find((friend) => currentFriendId === friend.id);

  return (
    <>
      <section>
        <p>search pubkey, name, notes</p>
        <input type="text" placeholder="enter name of friend" />
        <Link to="/friends/add">add friend</Link>
        <p>currently chatting with friend:</p>
        {
          (currentFriend)
            ? (
              <section>
                <p>{currentFriend.name}</p>
                <p>{currentFriend.key}</p>
                <Link to={`/friends/edit/${currentFriend.id}`}>edit</Link>
                <p>
                  notes:
                  {currentFriend.notes}
                </p>
              </section>
            )
            : <>nobody</>
        }

        <p>all friends:</p>
        {friendList.map((friend) => (
          <section key={friend.id}>
            <p>{friend.name}</p>
            <p>{friend.key}</p>
            <Link to={`/friends/edit/${friend.id}`}>edit</Link>
            <p>
              notes:
              {friend.notes}
            </p>
          </section>
        ))}
      </section>
      <FooterUser />
    </>
  );
}

export default Friends;
