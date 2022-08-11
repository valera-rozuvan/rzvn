import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FriendItem from '../FriendItem/FriendItem';

function MemberList() {
  const locationUrl = useLocation();
  const [pathName] = useState(locationUrl.pathname);
  const [groupMembersAdd, setGroupMembersAdd] = useState(false);
  const [groupMembers, setGroupMembers] = useState(false);

  useEffect(() => {
    const groupAdd = pathName === '/groups/add';
    const members = pathName === '/groups/members';

    if (groupAdd) {
      setGroupMembers(false);
      setGroupMembersAdd(true);
    } if (members) {
      setGroupMembersAdd(false);
      setGroupMembers(true);
    }
  }, [pathName]);

  const friendList = [
    {
      name: 'Eva', id: '067uoi0y4ti40t3i', key: '0x6wr61rw16wrw11', notes: 'girlfriend',
    },
    {
      name: 'Ben', id: '753y2r830uy38tu', key: '0x8357y92ruu9r2', notes: 'friend from work',
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
    <section>
      <div>
        {groupMembersAdd
          && friendList.map((friend) => (
            <FriendItem key={friend.key} friend={friend} componentType="memberList" />
          ))}
        {groupMembers
          && friendList.map((friend) => (
            <FriendItem key={friend.key} friend={friend} componentType="friendListGroup" />
          ))}
      </div>
    </section>
  );
}

export default MemberList;
