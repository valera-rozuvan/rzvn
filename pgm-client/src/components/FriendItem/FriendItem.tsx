import React from 'react';
import SuperButton from '../SuperButton';
import s from './friendItem.module.scss';

interface IFriend {
  id: string,
  name: string,
  key: string,
  notes: string,
}

interface IProps {
  friend: IFriend,
  componentType: string,

}
function FriendItem({ friend, componentType }: IProps) {
  function onEdit() {
    console.log('edit friend clicked'); // eslint-disable-line
  }
  function onAdd() {
    console.log('add friend clicked'); // eslint-disable-line
  }
  function onRemove() {
    console.log('remove friend clicked'); // eslint-disable-line
  }
  return (
    <section className={s.friends}>
      <div className={s.innerContainer}>
        <section key={friend.id}>
          <div className={s.friendBox}>
            <p className={s.friendName}>{friend.name}</p>
            <p className={s.friendKey}>{friend.key}</p>
            {
              (componentType === 'friends' || componentType === 'friendList')
              && <SuperButton text="edit" typeStyle="yellow" actionHandlers={{ onClick: onEdit }} />
            }
            {
              (componentType === 'groupMembers' || componentType === 'friendListGroup')
              && <SuperButton text="add" typeStyle="green" actionHandlers={{ onClick: onAdd }} />
            }
            {
              componentType === 'memberList'
              && <SuperButton text="remove" typeStyle="red" actionHandlers={{ onClick: onRemove }} />
            }
          </div>
          <p className={s.friendNotes}>
            notes:
            {friend.notes}
          </p>
        </section>
      </div>
    </section>
  );
}

export default FriendItem;
