import React from 'react';
// import { useNavigate } from 'react-router-dom';
import SuperButton from '../SuperButton';
import s from './friendItem.module.scss';

interface IFriend {
  id: string,
  name: string,
  key: string,
  notes: string,
}

// interface IActionHandlers {
//   onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
// }

interface IProps {
  friend: IFriend,
  componentType: string,
  // actionHandlers: IActionHandlers,
}
function FriendItem({ friend, componentType }: IProps) {
  // const navigate = useNavigate();
  function onEdit() {
    console.log('edit friend clicked');
  }
  function onAdd() {
    console.log('add friend clicked');
  }
  function onRemove() {
    console.log('remove friend clicked');
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
              // && <button type="button" className={s.friendEditBtn} onClick={actionHandlers.edit}>edit</button>
            }
            {
              componentType === 'groupMembers'
              // && <button type="button" className={s.friendAddBtn} onClick={actionHandlers.add}>add</button>
              && <SuperButton text="add" typeStyle="green" actionHandlers={{ onClick: onAdd }} />
            }
            {
              componentType === 'memberList'
              // && <button type="button" className={s.friendRemoveBtn} onClick={actionHandlers.remove}>remove</button>
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
