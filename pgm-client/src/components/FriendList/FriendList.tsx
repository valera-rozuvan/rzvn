import React from 'react';
import FriendItem from '../FriendItem/FriendItem';
// import s from './friendList.module.scss';

function FriendList() {
  // function editFriend(event: React.MouseEvent<HTMLButtonElement>): void {
  //   event.preventDefault();

  //   console.log('edit friend');
  // }

  const friendList = [
    {
      name: 'Olly', id: '067uoi0y4ti40t3i', key: '0x6wr61rw16wrw11', notes: 'girlfriend',
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

  return (
    <>
      {friendList.map((friend) => (
        <FriendItem key={friend.id} friend={friend} componentType="friendList" />
      ))}
    </>
  );
}

export default FriendList;
